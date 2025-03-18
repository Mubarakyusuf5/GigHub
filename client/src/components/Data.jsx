export const States = [
    { name: "Abia" },
    { name: "Abuja" },
    { name: "Adamawa" },
    { name: "Akwa Ibom" },
    { name: "Anambra" },
    { name: "Bauchi" },
    { name: "Bayelsa" },
    { name: "Benue" },
    { name: "Borno" },
    { name: "Cross River" },
    { name: "Delta" },
    { name: "Ebonyi" },
    { name: "Edo" },
    { name: "Ekiti" },
    { name: "Enugu" },
    { name: "Gombe" },
    { name: "Imo" },
    { name: "Jigawa" },
    { name: "Kaduna" },
    { name: "Kano" },
    { name: "Katsina" },
    { name: "Kebbi" },
    { name: "Kogi" },
    { name: "Kwara" },
    { name: "Lagos" },
    { name: "Nasarawa" },
    { name: "Niger" },
    { name: "Ogun" },
    { name: "Ondo" },
    { name: "Osun" },
    { name: "Oyo" },
    { name: "Plateau" },
    { name: "Rivers" },
    { name: "Sokoto" },
    { name: "Taraba" },
    { name: "Yobe" },
    { name: "Zamfara" }
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

// export const ReStats = [
//     {name: "Completed"},
//     {name: "Scheduled"},
//     {name: "Rejected"},
//     // 'Scheduled', "Completed", 'Pending', 'Rejected'
//     // {name: "Pending"}
// ]

