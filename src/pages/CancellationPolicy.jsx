export default function CancellationPolicy() {
  return (
    <div className="min-h-screen bg-white py-16 px-4">
      <div className="max-w-3xl mx-auto">

        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Cancellation Policy</h1>
          <p className="text-red-600 font-medium">Kentish Publishing Company</p>
          <p className="text-gray-500 text-sm mt-1">Effective Date: November 2025</p>
          <div className="h-1 w-16 bg-red-600 mt-4"></div>
        </div>

        <p className="text-gray-700 leading-relaxed mb-10">
          At Kentish Publishing Company, we are committed to maintaining clear expectations regarding all bookings, services, and purchases. This Cancellation Policy outlines our position on cancellations and scheduling.
        </p>

        <div className="space-y-10">

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. No Cancellations</h2>
            <p className="text-gray-700">
              All bookings and purchases are final and cannot be canceled once confirmed.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. Service-Based Bookings</h2>
            <p className="text-gray-700 mb-3">For consultations, publishing services, workshops, and related offerings:</p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 rounded-full bg-red-600 mt-2 flex-shrink-0"></span>
                <span>Time, resources, and scheduling commitments are allocated immediately upon confirmation.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 rounded-full bg-red-600 mt-2 flex-shrink-0"></span>
                <span>Clients are responsible for attending all scheduled sessions at the agreed time.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 rounded-full bg-red-600 mt-2 flex-shrink-0"></span>
                <span>Failure to attend a scheduled session ("no-show") will result in forfeiture of that session without refund or rescheduling.</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. Rescheduling (If Applicable)</h2>
            <p className="text-gray-700 mb-2">
              Rescheduling may be permitted only at the sole discretion of Kentish Publishing Company and must be requested in writing with reasonable notice.
            </p>
            <p className="text-gray-700">Approval of rescheduling is not guaranteed.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">4. Digital and Physical Products</h2>
            <p className="text-gray-700">
              Orders for digital products and physical goods cannot be canceled once placed. All product sales are final.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">5. Late Arrivals</h2>
            <p className="text-gray-700">
              Clients who arrive late to scheduled sessions may have their session shortened or forfeited, depending on scheduling constraints. No additional time or compensation will be provided.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">6. Exceptions</h2>
            <p className="text-gray-700">
              Any exceptions to this Cancellation Policy are made solely at the discretion of Kentish Publishing Company and must be confirmed in writing.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">7. Contact Information</h2>
            <p className="text-gray-700 mb-2">For questions regarding this Cancellation Policy, please contact:</p>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-gray-900">Kentish Publishing Company</p>
              <a href="mailto:kentishpublishing@gmail.com" className="text-red-600 hover:underline">kentishpublishing@gmail.com</a>
            </div>
          </section>

        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm leading-relaxed">
            By purchasing or booking with Kentish Publishing Company, you acknowledge that you have read, understood, and agreed to this Cancellation Policy.
          </p>
        </div>

      </div>
    </div>
  );
}
