export const metadata = {
  title: "Privacy Policy | 1Sat Ordinals",
};

export default function PrivacyPage() {
  return (
    <section className="w-full py-16">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold tracking-tight">Privacy Policy</h1>
          <div className="mt-8 space-y-6 text-muted-foreground">
            <p>Last updated: {new Date().toLocaleDateString()}</p>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
                1. Information We Collect
              </h2>
              <p>
                This website does not collect personal information. The 1Sat
                Ordinals protocol is a decentralized protocol on the Bitcoin SV
                blockchain. Any interactions with the blockchain are public and
                permanent by nature of blockchain technology.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
                2. Website Analytics
              </h2>
              <p>
                We may use standard web analytics tools to collect anonymous
                information about how visitors use this website, including pages
                visited, time spent on the site, and referring websites. This
                information is used solely to improve the website experience.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
                3. Blockchain Transparency
              </h2>
              <p>
                All transactions on the Bitcoin SV blockchain, including 1Sat
                Ordinals operations, are publicly visible and permanently
                recorded. This is a fundamental characteristic of blockchain
                technology and is not controlled by this website.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
                4. Third-Party Links
              </h2>
              <p>
                This website may contain links to external sites that are not
                operated by us. We have no control over the content and
                practices of these sites and cannot accept responsibility for
                their privacy policies.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
                5. Cookies
              </h2>
              <p>
                This website may use cookies for basic functionality and
                analytics. Cookies are small text files stored on your device.
                You can configure your browser to refuse all cookies or to
                indicate when a cookie is being sent.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
                6. Changes to This Policy
              </h2>
              <p>
                We may update this privacy policy from time to time. We will
                notify users of any changes by posting the new privacy policy on
                this page and updating the &quot;Last updated&quot; date.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-foreground mt-8 mb-4">
                7. Contact
              </h2>
              <p>
                If you have questions about this privacy policy, please join our
                Discord community or visit the GitHub repository for more
                information.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
