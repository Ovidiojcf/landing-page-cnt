import Image from "next/image";
import { type Locale } from "@/get-dictionary";


export interface FooterDictionary {
    company_name: string;
    office_title: string;
    address: string;
    email: string;
    phone_label: string;
    phone_number: string;
    copyright: string;
    logo_url: string;
    logo_alt: string;
  }
  

  export interface FooterProps {
    lang: Locale;
    dict: FooterDictionary; // Recebe o objeto do footer ali de cima
  }



export function Footer({ lang, dict }: FooterProps) {
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto px-4">
                <Image
                    src={dict.logo_url}
                    alt={dict.logo_alt}
                    width={160}
                    height={40}
                    className="h-9 w-auto md:h-10"
                    priority
                />
                <p className="text-center text-sm">
                    {dict.copyright}
                </p>
            </div>
        
        </footer>
    );
}