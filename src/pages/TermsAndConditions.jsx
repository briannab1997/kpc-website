export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-white py-16 px-4">
      <div className="max-w-3xl mx-auto">

        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Terms and Conditions</h1>
          <p className="text-red-600 font-medium">Kentish Publishing Company</p>
          <p className="text-gray-500 text-sm mt-1">Effective Date: November 2025</p>
          <div className="h-1 w-16 bg-red-600 mt-4"></div>
        </div>

        <p className="text-gray-700 leading-relaxed mb-10">
          Welcome to Kentish Publishing Company. These Terms and Conditions govern your use of our website, services, and products. By accessing our website or purchasing from us, you agree to be bound by these Terms.
        </p>

        <div className="space-y-10">

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Company Information</h2>
            <p className="text-gray-700">
              Kentish Publishing Company provides publishing services, consultations, digital products, physical books, journals, merchandise, and related offerings.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. Acceptance of Terms</h2>
            <p className="text-gray-700">
              By using this website or purchasing any product or service, you confirm that you have read, understood, and agreed to these Terms and Conditions, along with our Refund Policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. Products and Services</h2>
            <p className="text-gray-700 mb-3">We offer a range of services and products including, but not limited to:</p>
            <ul className="space-y-2 text-gray-700 mb-3">
              {[
                "Book publishing and editorial services",
                "Consultations and workshops",
                "Digital downloads (e-books, guides, etc.)",
                "Physical products (books, journals, merchandise)",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-600 mt-2 flex-shrink-0"></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-gray-700">All descriptions, pricing, and availability are subject to change at any time without notice.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">4. Pricing and Payments</h2>
            <p className="text-gray-700 mb-2">All prices are listed in applicable currency and are subject to change.</p>
            <p className="text-gray-700 mb-2">Full payment is required at the time of purchase unless otherwise agreed in writing.</p>
            <p className="text-gray-700">Kentish Publishing Company reserves the right to refuse or cancel any order at its discretion.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">5. All Sales Are Final</h2>
            <p className="text-gray-700">
              All purchases are non-refundable. By completing a purchase, you agree to our Refund Policy and acknowledge that all sales are final.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">6. Cancellations</h2>
            <p className="text-gray-700 mb-2">
              All bookings, purchases, and service agreements are final and cannot be canceled once confirmed.
            </p>
            <p className="text-gray-700">
              Failure to attend scheduled consultations, workshops, or services will not result in a refund or rescheduling unless otherwise agreed in writing.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">7. Intellectual Property</h2>
            <p className="text-gray-700 mb-2">
              All content, materials, products, and services provided by Kentish Publishing Company remain the intellectual property of the company unless otherwise stated in writing.
            </p>
            <p className="text-gray-700 mb-2">
              Clients retain rights to their original submitted work. However, any materials, designs, frameworks, or proprietary processes created by Kentish Publishing Company remain its property.
            </p>
            <p className="text-gray-700">
              No content may be copied, reproduced, distributed, or used without prior written permission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">8. Client Responsibilities</h2>
            <p className="text-gray-700 mb-3">Clients agree to:</p>
            <ul className="space-y-2 text-gray-700 mb-3">
              {[
                "Provide accurate and complete information",
                "Meet agreed deadlines when applicable",
                "Communicate in a timely and professional manner",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-600 mt-2 flex-shrink-0"></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-gray-700">Delays caused by the client may impact project timelines and outcomes.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">9. Limitation of Liability</h2>
            <p className="text-gray-700 mb-3">Kentish Publishing Company is not liable for:</p>
            <ul className="space-y-2 text-gray-700 mb-3">
              {[
                "Indirect, incidental, or consequential damages",
                "Loss of profits, revenue, or business opportunities",
                "Outcomes resulting from the use of our services or products",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-600 mt-2 flex-shrink-0"></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-gray-700">All services are provided "as is" without guarantees of specific results.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">10. Payment Disputes</h2>
            <p className="text-gray-700 mb-2">
              By purchasing from Kentish Publishing Company, you agree not to initiate chargebacks or payment disputes without first contacting us to resolve the issue.
            </p>
            <p className="text-gray-700">
              Unauthorized disputes may result in termination of services and restriction from future transactions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">11. Modifications to Services and Terms</h2>
            <p className="text-gray-700">
              We reserve the right to update, modify, or discontinue any part of our services, products, or these Terms at any time without prior notice.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">12. Governing Law</h2>
            <p className="text-gray-700">
              These Terms and Conditions shall be governed and interpreted in accordance with applicable laws in the jurisdiction in which the business operates.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">13. Contact Information</h2>
            <p className="text-gray-700 mb-2">For questions regarding these Terms and Conditions, please contact:</p>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-900">Kentish Publishing Company</p>
              <a href="mailto:kentishpublishing@gmail.com" className="text-red-600 hover:underline">kentishpublishing@gmail.com</a>
            </div>
          </section>

        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm leading-relaxed">
            By using this website or purchasing from Kentish Publishing Company, you acknowledge that you have read, understood, and agreed to these Terms and Conditions.
          </p>
        </div>

      </div>
    </div>
  );
}
