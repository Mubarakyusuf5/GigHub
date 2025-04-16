export const States = [
    { state: "Abia" },
    { state: "Abuja" },
    { state: "Adamawa" },
    { state: "Akwa Ibom" },
    { state: "Anambra" },
    { state: "Bauchi" },
    { state: "Bayelsa" },
    { state: "Benue" },
    { state: "Borno" },
    { state: "Cross River" },
    { state: "Delta" },
    { state: "Ebonyi" },
    { state: "Edo" },
    { state: "Ekiti" },
    { state: "Enugu" },
    { state: "Gombe" },
    { state: "Imo" },
    { state: "Jigawa" },
    { state: "Kaduna" },
    { state: "Kano" },
    { state: "Katsina" },
    { state: "Kebbi" },
    { state: "Kogi" },
    { state: "Kwara" },
    { state: "Lagos" },
    { state: "Nasarawa" },
    { state: "Niger" },
    { state: "Ogun" },
    { state: "Ondo" },
    { state: "Osun" },
    { state: "Oyo" },
    { state: "Plateau" },
    { state: "Rivers" },
    { state: "Sokoto" },
    { state: "Taraba" },
    { state: "Yobe" },
    { state: "Zamfara" }
];

export const Roles = [
    {role: "Admin"},
    {role: "Client"},
    {role: "Freelancer"},
]

export const Status = [
    {stat: "Active"},
    {stat: "Suspended"},
    {stat: "Blocked"},
]

export const Industries = [
  { industry: "Information Technology (IT) & Software" },
  { industry: "Web & Mobile Development" },
  { industry: "Design & Creative" },
  { industry: "Writing & Translation" },
  { industry: "Marketing & Advertising" },
  { industry: "Sales & Customer Support" },
  { industry: "Finance & Accounting" },
  { industry: "Engineering & Architecture" },
  { industry: "Legal Services" },
  { industry: "Education & Training" },
  { industry: "Healthcare & Medical" },
  { industry: "Real Estate" },
  { industry: "E-Commerce & Retail" },
  { industry: "Media & Entertainment" },
  { industry: "Travel & Hospitality" },
  { industry: "Manufacturing" },
  { industry: "Transportation & Logistics" },
  { industry: "Human Resources (HR) & Recruitment" },
  { industry: "Consulting & Business Strategy" },
  { industry: "Data Science & Analytics" },
  { industry: "Non-Profit & NGO" },
  { industry: "Agriculture & Farming" },
  { industry: "Construction & Building" },
  { industry: "Telecommunications" },
  { industry: "Energy & Utilities" },
  { industry: "Government & Public Sector" },
  { industry: "Fashion & Apparel" },
  { industry: "Food & Beverage" },
  { industry: "Gaming & Animation" },
  { industry: "Event Planning & Management" }
];
export const ExperienceLevel = [
  { level: "Entry Level" },
  { level: "Intermediate" },
  { level: "Expert" },
  
]

export const formatNaira = (amount) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount);
  };

export const handlePayment = (amount, jobTitle, clientEmail, clientName) => {
  // need job id 
    // console.log(amount, jobId, clientName, clientEmail);
    window.MonnifySDK.initialize({
      amount, // Amount to pay
      currency: "NGN",
      reference: `TXN_${Date.now()}`, // Unique reference
      customerName: clientName,
      customerEmail: clientEmail,
      apiKey: import.meta.env.VITE_MONNIFY_API_KEY, // Replace with Monnify Public Key
      contractCode: import.meta.env.VITE_MONNIFY_CONTRACT_CODE, // Replace with Monnify Contract Code
      paymentDescription: `Payment for Job ${jobTitle}`,
      isTestMode: true, // Change to false in production
      paymentMethods: ["CARD",
    "ACCOUNT_TRANSFER",
    "USSD",
    "PHONE_NUMBER"],
      onLoadStart: () => {
        console.log("loading has started")
      },
      onLoadComplete: () => {
        console.log("SDK is UP")
      },
      onComplete: (response) => {
        if (response.paymentStatus === "PAID") {
          // Update your backend with the payment status
          fetch('/api/verify/payment-success', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(response)
          })
          .then(res => res.json())
          .then(data => {
            console.log('Payment status updated:', data);
          })
          .catch(error => {
            console.error('Error updating payment status:', error);
          });
      
          // Update the UI to show payment success
          alert('Payment Successful!');
        } else {
          alert('Payment Failed!');
        }
      },
      onClose: function (data){
        console.log(data);
        if (data.responseCode === "USER_CANCELLED") {
          alert('Payment was cancelled by the user.');
        } else {
          alert('Payment process was closed.');
        }
      }
    });
  };

 {/* Breadcrumb */}
        {/* <nav className="flex mb-5" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link to="/" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700">
                <HomeIcon className="w-4 h-4 mr-2" />
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <ChevronRightIcon className="w-4 h-4 text-gray-400" />
                <Link to="/account-settings" className="ml-1 text-sm font-medium text-gray-500 hover:text-gray-700 md:ml-2">
                  Account Settings
                </Link>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <ChevronRightIcon className="w-4 h-4 text-gray-400" />
                <span className="ml-1 text-sm font-medium text-blue-600 md:ml-2">
                  {tabs.find(t => t.tab === tab)?.title}
                </span>
              </div>
            </li>
          </ol>
        </nav> */}