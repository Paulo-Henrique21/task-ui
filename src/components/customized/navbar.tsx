// "use client";

// import { usePathname } from "next/navigation";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import { Menu } from "lucide-react";
// import { ModeToggle } from "./mode-toggle";
// import { ReactNode } from "react";

// export function Navbar({ children }: { children: ReactNode }) {
//   const pathname = usePathname();

//   const menuItems = [
//     { label: "Despesas", href: "/private" },
//     { label: "Dashboard", href: "#" },
//   ];

//   return (
//     <div className="min-h-screen flex flex-col">
//       <header className="sticky flex justify-center top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//         <div className="container flex h-16 md:justify-center items-center mx-4 max-w-5xl">
//           <div className="hidden md:flex w-full items-center">
//             <nav>
//               <ul className="flex items-center space-x-6 text-sm font-medium">
//                 {menuItems.map((item) => (
//                   <li key={item.href}>
//                     <Link
//                       href={item.href}
//                       className={`transition-colors hover:text-foreground/80 ${
//                         pathname === item.href
//                           ? "text-primary font-semibold"
//                           : "text-foreground"
//                       }`}
//                     >
//                       {item.label}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </nav>
//           </div>
//           <Sheet>
//             <SheetTrigger asChild>
//               <Button variant="outline" size={"icon"} className="md:hidden">
//                 <Menu className="h-6 w-6" />
//                 <span className="sr-only">Toggle Menu</span>
//               </Button>
//             </SheetTrigger>
//             <SheetContent side="left" className="pr-0">
//               <nav>
//                 <ul className="grid gap-6 px-2 py-6">
//                   {menuItems.map((item) => (
//                     <li key={item.href}>
//                       <Link
//                         href={item.href}
//                         className={`block hover:text-foreground/80 ${
//                           pathname === item.href
//                             ? "text-primary font-semibold"
//                             : "text-foreground"
//                         }`}
//                       >
//                         {item.label}
//                       </Link>
//                     </li>
//                   ))}
//                 </ul>
//               </nav>
//             </SheetContent>
//           </Sheet>
//           <div className="ml-auto">
//             <ModeToggle />
//           </div>
//         </div>
//       </header>
//       <main className="flex-1 p-4">{children}</main>
//     </div>
//   );
// }

// import Logo from '@/components/navbar-components/logo'
import { ModeToggle } from "@/components/customized/mode-toggle";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function Navbar({ children }: { children: React.ReactNode }) {
  const navigationLinks = [
    { href: "#", label: "Home", active: true },
    { href: "#", label: "Features" },
    { href: "#", label: "Pricing" },
    { href: "#", label: "About" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 z-50 w-full border-b bg-background/70 backdrop-blur-md px-4 md:px-6">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Left side */}
          <div className="flex items-center gap-2">
            {/* Mobile menu trigger */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  className="group size-8 md:hidden"
                  variant="ghost"
                  size="icon"
                >
                  <svg
                    className="pointer-events-none"
                    width={16}
                    height={16}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 12L20 12"
                      className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                    />
                    <path
                      d="M4 12H20"
                      className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                    />
                    <path
                      d="M4 12H20"
                      className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                    />
                  </svg>
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-36 p-1 md:hidden">
                <NavigationMenu className="max-w-none *:w-full">
                  <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                    {navigationLinks.map((link, index) => (
                      <NavigationMenuItem key={index} className="w-full">
                        <NavigationMenuLink
                          href={link.href}
                          className="py-1.5"
                          active={link.active}
                        >
                          {link.label}
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    ))}
                  </NavigationMenuList>
                </NavigationMenu>
              </PopoverContent>
            </Popover>
            {/* Main nav */}
            <div className="flex items-center gap-6">
              {/* Navigation menu */}
              <NavigationMenu className="max-md:hidden">
                <NavigationMenuList className="gap-2">
                  {navigationLinks.map((link, index) => (
                    <NavigationMenuItem key={index}>
                      <NavigationMenuLink
                        active={link.active}
                        href={link.href}
                        className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                      >
                        {link.label}
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>

          <ModeToggle />
        </div>
      </header>
      <div className="container max-w-8xl mx-auto px-4 md:px-6 py-8 pt-24">{children}</div>
    </>
  );
}
