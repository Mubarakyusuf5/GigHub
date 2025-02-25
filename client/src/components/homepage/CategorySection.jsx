import React from 'react'

export const CategorySection = () => {
  return (
    <section className="py-12 mb-16 bg-gray-50 bg-opacity-">
        <h2 className="text-3xl font-medium text-center mb-12">Explore Popular Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {[
            { 
              // icon: CodeBracketIcon, 
              title: "Web Development", description: "Build and optimize websites." },
            { 
              // icon: PaintBrushIcon, 
              title: "Graphic Design", description: "Eye-catching logos and branding." },
            { 
              // icon: LanguageIcon, 
              title: "Writing & Translation", description: "Quality content in any language." },
            { 
              // icon: MegaphoneIcon, 
              title: "Digital Marketing", description: "SEO, social media, and more." },
            { 
              // icon: UserCircleIcon, 
              title: "Virtual Assistance", description: "Administrative support made easy." },
          ].map((category, index) => (
            <div key={index} className="flex items-start border space-x-4">
              {/* <category.icon className="h-8 w-8 text-primary flex-shrink-0" /> */}
              <div>
                <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                <p className="text-muted-foreground">{category.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center">
          <button  className="text-lg">
            View All Categories 
            {/* <ChevronRight className="ml-2 h-4 w-4" /> */}
          </button>
        </div>
      </section>
  )
}
