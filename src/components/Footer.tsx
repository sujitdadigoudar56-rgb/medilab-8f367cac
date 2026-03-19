import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contact" className="border-t border-border py-16 bg-card/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-10">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-display font-bold text-sm">M+</span>
              </div>
              <span className="text-xl font-display font-bold text-foreground">
                Medi<span className="text-primary">Lab</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Making healthcare diagnostics accessible, affordable and convenient for everyone.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-primary" /> 1-800-MEDILAB</li>
              <li className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-primary" /> support@medilab.com</li>
              <li className="flex items-start gap-2"><MapPin className="w-3.5 h-3.5 text-primary mt-0.5" /> 50+ cities across India</li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4 text-sm text-foreground">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#about" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#contact" className="hover:text-primary transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">FAQs</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Refund Policy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4 text-sm text-foreground">Our Services</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Online Consultation</a></li>
              <li><a href="#packages" className="hover:text-primary transition-colors">Health Packages</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Digital Reports</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Preventive Programs</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Home Lab Services</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4 text-sm text-foreground">Popular Tests</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#tests" className="hover:text-primary transition-colors">Complete Blood Count</a></li>
              <li><a href="#tests" className="hover:text-primary transition-colors">Thyroid Profile</a></li>
              <li><a href="#tests" className="hover:text-primary transition-colors">Diabetes Screening</a></li>
              <li><a href="#tests" className="hover:text-primary transition-colors">Full Body Checkup</a></li>
              <li><a href="#tests" className="hover:text-primary transition-colors">Lipid Profile</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4 text-sm text-foreground">Our Network</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Partner Hospitals</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Diagnostic Centers</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Health Blogs</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Disease Guides</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Wellness Tips</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <span>© 2026 MediLab. All rights reserved. | NABL Accredited Laboratory Partner</span>
          <div className="flex items-center gap-4">
            <span>📱 Download App: Android | iOS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
