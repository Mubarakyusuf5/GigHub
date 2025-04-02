import React, { useEffect, useState } from "react";

const categor = [
  {
    category: "Web Development",
    skills: ["HTML", "CSS", "JavaScript", "React.js", "Node.js", "Express.js", "MongoDB"],
  },
  {
    category: "Mobile App Development",
    skills: ["Kotlin", "Swift", "React Native", "Flutter", "Dart", "Java"],
  },
  {
    category: "Data Science & Machine Learning",
    skills: ["Python", "R", "TensorFlow", "PyTorch", "Scikit-Learn", "Pandas"],
  },
];

export const SkillSelector = () => {
  const [categories, setCategories] = useState(categor);
  const [skills, setSkills] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("");

  useEffect(() => {
    // Find the selected category from categor (not categories)
    const foundCategory = categor.find((cat) => cat.category === selectedCategory);
    setSkills(foundCategory ? foundCategory.skills : []);
    setSelectedSkill(""); // Reset skill when category changes
  }, [selectedCategory]);

  console.log(skills);
  console.log(`${selectedCategory} ${selectedSkill}`);

  return (
    <div className="max-w-md mx-auto text-center p-4 border rounded-lg shadow-lg bg-white">
      <h2 className="text-xl font-bold mb-3">Select Your Skill Field</h2>

      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="w-full p-2 border rounded-md"
      >
        <option value="">-- Select Category --</option>
        {categories.map((cat, index) => (
          <option key={index} value={cat.category}>
            {cat.category}
          </option>
        ))}
      </select>

      {selectedCategory && (
        <>
          <h3 className="text-lg font-semibold mt-4">Select Your Skill</h3>
          <select
            value={selectedSkill}
            onChange={(e) => setSelectedSkill(e.target.value)}
            className="w-full p-2 border rounded-md mt-2"
          >
            <option value="">-- Select Skill --</option>
            {skills.map((skill, index) => (
              <option key={index} value={skill}>
                {skill}
              </option>
            ))}
          </select>
        </>
      )}

      {selectedSkill && (
        <p className="mt-4 text-green-600 font-semibold">
          You selected: {selectedCategory} → {selectedSkill}
        </p>
      )}

      {categor.map(({skills}, index)=> (
        <ul>
          <li key={index}>{skills.join(", ")}</li>
        </ul>
      ))}
    </div>
  );
};
