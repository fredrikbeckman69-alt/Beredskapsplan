import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Borttaget output: "export" och basePath: "/Beredskapsplan" 
  // eftersom plattformen använder Middleware och API-rutter (vilket kräver Node-server/Vercel)
  // och för att förhindra att root (/) ger 404 lokalt.
};

export default nextConfig;
