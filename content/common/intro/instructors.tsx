type Instructor = {
    name: string;
    title: string;
    
    twitter: string;
    linkedin: string;
    github: string;
};

const instructors: Instructor[] = [
    {
        name: "Martin Eckardt",
        title: "Director of Developer Relations",

        twitter: "https://twitter.com/martin_eckardt",
        linkedin: "https://www.linkedin.com/in/eckardt/",
        github: "https://github.com/martineckardt",
    },
    {
        name: "Andrea Vargas",
        title: "Sr. Developer Relations Engineer",

        twitter: "https://x.com/Andyvargtz",
        linkedin: "https://www.linkedin.com/in/andyvargtz/",
        github: "https://github.com/andyvargtz",
    },
    {
        name: "Ash",
        title: "Developer Relations Engineer",

        twitter: "https://x.com/ashngmi",
        linkedin: "https://www.linkedin.com/in/andyvargtz/",
        github: "https://github.com/ashucoder9",
    },
    {
        name: "Owen Wahlgren",
        title: "Developer Relations Engineer",

        twitter: "https://x.com/owenwahlgren",
        linkedin: "https://www.linkedin.com/in/owenwahlgren/",
        github: "https://github.com/owenwahlgren",
    },
    {
        name: "Sarp",
        title: "Sr. Developer Relations Engineer",

        twitter: "https://x.com/satatocom",
        linkedin: "https://www.linkedin.com/in/sarptaylan/",
        github: "https://github.com/0xstt",
    }
];

export function getInstructorsByNames(names:string[]) : Instructor[] {
    return instructors.filter((instructor) => names.includes(instructor.name));
}

export default instructors;