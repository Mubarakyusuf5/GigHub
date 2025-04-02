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

export const formatNaira = (amount) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount);
  };



