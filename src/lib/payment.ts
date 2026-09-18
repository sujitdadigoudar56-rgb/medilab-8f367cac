import { apiPost } from "@/lib/api";

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => { open: () => void; on: (event: string, cb: () => void) => void };
  }
}

let scriptPromise: Promise<void> | null = null;

function loadRazorpayScript(): Promise<void> {
  if (window.Razorpay) return Promise.resolve();
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Razorpay checkout"));
    document.body.appendChild(script);
  });
  return scriptPromise;
}

interface PayForAppointmentArgs {
  appointmentId: string;
  amount: number;
  name: string;
  email: string;
}

export async function payForAppointment({ appointmentId, amount, name, email }: PayForAppointmentArgs): Promise<void> {
  await loadRazorpayScript();

  const order = await apiPost<{ id: string; amount: number; currency: string }>("/payments/create-order", {
    amount,
    appointmentId,
  });

  return new Promise((resolve, reject) => {
    const rzp = new window.Razorpay({
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "MediLab",
      description: "Appointment Payment",
      order_id: order.id,
      prefill: { name, email },
      theme: { color: "#1a9c8c" },
      handler: async (response: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) => {
        try {
          await apiPost("/payments/verify-payment", { ...response, appointmentId, amount });
          resolve();
        } catch (err) {
          reject(err);
        }
      },
      modal: {
        ondismiss: () => reject(new Error("Payment cancelled")),
      },
    });
    rzp.on("payment.failed", () => reject(new Error("Payment failed")));
    rzp.open();
  });
}
