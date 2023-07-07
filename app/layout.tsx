import "./global.scss";
import Form from "./(components)/client";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head />
      <body>
        {children}
        <main>
          <Form />
        </main>
        <noscript>
          Please turn on Javascript in your browser to use the calculator
        </noscript>
        <footer className="footer">
          <p>Created by</p>
          <div className="github">
            <p>GitHub page </p>
            <img src="Github.svg" alt="Github logo" />
          </div>
          <p>
            Not in any way affiliated with HoYoVerse. This site will{" "}
            <b>never</b> ask for personal nor account information.
          </p>
        </footer>
      </body>
    </html>
  );
}
