export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white py-16 px-4">
      <div className="max-w-3xl mx-auto">

        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
          <p className="text-red-600 font-medium">Kentish Publishing Company</p>
          <p className="text-gray-500 text-sm mt-1">Effective Date: November 2025</p>
          <div className="h-1 w-16 bg-red-600 mt-4"></div>
        </div>

        <p className="text-gray-700 leading-relaxed mb-10">
          Kentish Publishing Company ("we," "our," or "us") respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or engage with our services.
        </p>

        <div className="space-y-10">

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Information We Collect</h2>
            <p className="text-gray-700 mb-3">We may collect the following types of personal information:</p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 rounded-full bg-red-600 mt-2 flex-shrink-0"></span>
                <span><strong>Personal Information:</strong> Name, email address, billing details, and any information you provide when contacting us or purchasing a product or service.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 rounded-full bg-red-600 mt-2 flex-shrink-0"></span>
                <span><strong>Payment Information:</strong> Payment details are processed securely through third-party payment providers. We do not store full payment information.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 rounded-full bg-red-600 mt-2 flex-shrink-0"></span>
                <span><strong>Usage Data:</strong> Information about how you interact with our website, such as IP address, browser type, pages visited, and time spent on the site.</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. How We Use Your Information</h2>
            <p className="text-gray-700 mb-3">We use the information we collect to:</p>
            <ul className="space-y-2 text-gray-700">
              {[
                "Provide and deliver products and services",
                "Process transactions and send confirmations",
                "Communicate with you regarding your purchases, inquiries, or services",
                "Improve our website, offerings, and customer experience",
                "Maintain business records and comply with legal obligations",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-600 mt-2 flex-shrink-0"></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. Sharing of Information</h2>
            <p className="text-gray-700 mb-3">We do not sell, trade, or rent your personal information. We may share your information only with:</p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 rounded-full bg-red-600 mt-2 flex-shrink-0"></span>
                <span>Trusted third-party service providers (such as payment processors and website hosting platforms) necessary to operate our business.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 rounded-full bg-red-600 mt-2 flex-shrink-0"></span>
                <span>Legal authorities if required by law or to protect our rights.</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">4. Data Security</h2>
            <p className="text-gray-700">
              We take reasonable measures to protect your personal information from unauthorized access, misuse, or disclosure. However, no system can be guaranteed to be completely secure.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">5. Cookies and Tracking Technologies</h2>
            <p className="text-gray-700 mb-2">
              Our website may use cookies or similar technologies to enhance user experience, analyze website traffic, and improve functionality.
            </p>
            <p className="text-gray-700">You may choose to disable cookies through your browser settings.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">6. Your Rights</h2>
            <p className="text-gray-700 mb-3">Depending on your location, you may have the right to:</p>
            <ul className="space-y-2 text-gray-700">
              {[
                "Request access to your personal data",
                "Request correction or deletion of your data",
                "Withdraw consent to data processing where applicable",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-600 mt-2 flex-shrink-0"></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-gray-700 mt-3">To exercise these rights, please contact us using the information below.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">7. Third-Party Links</h2>
            <p className="text-gray-700">
              Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of those sites.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">8. Changes to This Policy</h2>
            <p className="text-gray-700">
              We reserve the right to update or modify this Privacy Policy at any time. Updates will be posted on this page with a revised effective date.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">9. Contact Information</h2>
            <p className="text-gray-700 mb-2">If you have any questions about this Privacy Policy or how your information is handled, please contact:</p>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-900">Kentish Publishing Company</p>
              <a href="mailto:kentishpublishing@gmail.com" className="text-red-600 hover:underline">kentishpublishing@gmail.com</a>
            </div>
          </section>

        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm leading-relaxed">
            By using our website or services, you acknowledge that you have read, understood, and agreed to this Privacy Policy.
          </p>
        </div>

      </div>
    </div>
  );
}
