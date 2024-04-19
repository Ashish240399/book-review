import { Inter } from "next/font/google";
import "./globals.css";
import theme from "@/theme";
import { ThemeProvider } from "@mui/material/styles";
import DrawerAppBar from "@/components/DrawerAppBar";
import { PageContainer } from "@/components/PageContainer";
import { Providers } from "@/redux/provider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider theme={theme}>
            <div className="bg-white min-h-[100vh] w-[100vw] overflow-auto text-[#000000b8]">
              <DrawerAppBar />
              <PageContainer>{children}</PageContainer>
            </div>
          </ThemeProvider>
        </body>
      </html>
    </Providers>
  );
}
