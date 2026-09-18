import {
  TestTube, FileText, Truck, Clock, ShieldCheck, Smartphone,
  Search, CalendarCheck, Droplets, FileCheck,
  Heart, Baby, Apple, Brain, Syringe,
  Activity, Shield, Leaf, Microscope, Dna, Bone,
  Stethoscope, Eye, Pill, Ear, Users, Award,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  TestTube, FileText, Truck, Clock, ShieldCheck, Smartphone,
  Search, CalendarCheck, Droplets, FileCheck,
  Heart, Baby, Apple, Brain, Syringe,
  Activity, Shield, Leaf, Microscope, Dna, Bone,
  Stethoscope, Eye, Pill, Ear, Users, Award,
};

export function getIcon(name: string | undefined): LucideIcon {
  return (name && iconMap[name]) || Activity;
}
