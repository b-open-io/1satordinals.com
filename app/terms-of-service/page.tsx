export const metadata = {
  title: "Terms of Service | 1Sat Ordinals",
};

export default function TermsPage() {
  return (
    <section className="w-full py-16">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold tracking-tight">Terms of Service</h1>
          <div className="mt-8 space-y-6 text-muted-foreground">
            <p>Last updated: {new Date().toLocaleDateString()}</p>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing and using this website, you accept and agree to be bound by the terms and
                provision of this agreement.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">2. Use License</h2>
              <p>
                Permission is granted to temporarily access the materials (information or software) on
                1Sat Ordinals&apos; website for personal, non-commercial transitory viewing only.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">3. Disclaimer</h2>
              <p>
                The materials on 1Sat Ordinals&apos; website are provided on an &apos;as is&apos; basis.
                1Sat Ordinals makes no warranties, expressed or implied, and hereby disclaims and
                negates all other warranties including, without limitation, implied warranties or
                conditions of merchantability, fitness for a particular purpose, or non-infringement
                of intellectual property or other violation of rights.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">4. Limitations</h2>
              <p>
                In no event shall 1Sat Ordinals or its suppliers be liable for any damages (including,
                without limitation, damages for loss of data or profit, or due to business interruption)
                arising out of the use or inability to use the materials on 1Sat Ordinals&apos; website.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">5. Protocol Usage</h2>
              <p>
                The 1Sat Ordinals protocol is an open-source protocol on the Bitcoin SV blockchain.
                Users are responsible for their own use of the protocol and any transactions they make.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">6. Modifications</h2>
              <p>
                1Sat Ordinals may revise these terms of service for its website at any time without
                notice. By using this website you are agreeing to be bound by the then current version
                of these terms of service.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
