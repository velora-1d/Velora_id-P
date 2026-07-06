import {
    BarChart3, Briefcase, Building2, Code2, CreditCard, Database,
    FileSearch, FileText, Globe, GraduationCap, HelpCircle,
    LayoutDashboard, Layers, MessageSquare, Package, Rocket, Search,
    Send, Server, Shield, ShoppingCart, Tag, Truck, Users, Wallet,
    Workflow
} from 'lucide-react';

export const iconMap = {
    BarChart3, Briefcase, Building2, Code2, CreditCard, Database,
    FileSearch, FileText, Globe, GraduationCap, HelpCircle,
    LayoutDashboard, Layers, MessageSquare, Package, Rocket, Search,
    Send, Server, Shield, ShoppingCart, Tag, Truck, Users, Wallet,
    Workflow
};

export const iconOptions = Object.keys(iconMap);

export function getIcon(name, fallback = 'Globe') {
    return iconMap[name] || iconMap[fallback] || Globe;
}
