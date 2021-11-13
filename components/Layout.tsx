export default function Layout({ children }: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className="wrapper">{children}</div>
      <style jsx>{`
        .wrapper {

        }
      `}</style>
      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
        }

        :root {
          --site-color: royalblue;
          --divider-color: rgba(0, 0, 0, 0.4);
        }

        // html {
        //   font: 100%/1.5 system-ui;
        // }

        a {
          color: inherit;
          text-decoration-color: var(--divider-color);
          text-decoration-thickness: 2px;
        }

        a:hover {
          color: var(--site-color);
          text-decoration-color: currentcolor;
        }
        
        code {
          font-family: 'Menlo';
        }
      `}</style>
    </>
  )
}
