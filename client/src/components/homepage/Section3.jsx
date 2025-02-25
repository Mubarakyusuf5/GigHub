import React from 'react'
import {
  CodeBracketIcon,
  PaintBrushIcon,
  LanguageIcon,
  MegaphoneIcon,
  UserCircleIcon,
  ClipboardDocumentListIcon,
  UserGroupIcon,
  CreditCardIcon,
  UserPlusIcon,
  MagnifyingGlassIcon,
  PaperAirplaneIcon,
  BanknotesIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline"

export const Section3 = () => {
  return (
    <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-12">Getting Started is Simple</h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-square">
            <img
              src="/placeholder.svg?height=400&width=400"
              alt="How it works illustration"
              className="rounded-lg"
            />
          </div>
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-4">For Clients</h3>
              <ul className="space-y-4">
                {[
                  { icon: ClipboardDocumentListIcon, text: "Post your project and set a budget." },
                  { icon: UserGroupIcon, text: "Receive proposals from freelancers." },
                  { icon: MagnifyingGlassIcon, text: "Choose the best fit and collaborate." },
                  { icon: CreditCardIcon, text: "Pay only when you're satisfied." },
                ].map((step, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <step.icon className="h-6 w-6 text-primary flex-shrink-0" />
                    <span>{step.text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4">For Freelancers</h3>
              <ul className="space-y-4">
                {[
                  { icon: UserPlusIcon, text: "Create a profile and list your skills." },
                  { icon: MagnifyingGlassIcon, text: "Browse jobs that match your expertise." },
                  { icon: PaperAirplaneIcon, text: "Submit proposals and win projects." },
                  { icon: BanknotesIcon, text: "Get paid securely and grow your career." },
                ].map((step, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <step.icon className="h-6 w-6 text-primary flex-shrink-0" />
                    <span>{step.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
  )
}
