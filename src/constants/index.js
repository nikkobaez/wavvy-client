const reviews = [
    {
        id: 1,
        fullName: "Thomas Williams",
        jobTitle: "Software Engineer",
        profileImage: "https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-3.jpg",
        reviewText: "Wavvy sets a new standard for user-friendly excellence. With its visually appealing and intuitive design, messaging has become easy and enjoyable. Wavvy is my daily companion for staying connected. If you appreciate simplicity and efficiency, Wavvy is the chat platform you've been waiting for."
    },
    {
        id: 2,
        fullName: "Kiara Hernandez",
        jobTitle: "Project Manager",
        profileImage: "https://writestylesonline.com/wp-content/uploads/2018/11/Three-Statistics-That-Will-Make-You-Rethink-Your-Professional-Profile-Picture-1024x1024.jpg",
        reviewText: "Wavvy's user-friendly design makes messaging a joy. The simplicity-meets-efficiency approach sets it apart as the ideal platform for easy and seamless communication. If you value efficiency in your messaging experience, Wavvy is the way to go, ensuring that every conversation flows effortlessly."
    },
    {
        id: 3,
        fullName: "Kash Freeman",
        jobTitle: "CEO of Aerospace",
        profileImage: "https://images.unsplash.com/flagged/photo-1595514191830-3e96a518989b?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb2ZpbGUlMjBwaG90b3xlbnwwfHwwfHx8MA%3D%3D",
        reviewText: "Wavvy isn't just a chat platform; it's a realm where relationships thrive and memories are made. It's my number one platform for heartfelt conversations that have no limitations and transcend distances. Highly recommended for those seeking a more meaningful online connection."
    },
    {
        id: 4,
        fullName: "Gilbert Fernandez",
        jobTitle: "UI/UX Designer",
        profileImage: "https://www.shutterstock.com/image-photo/head-shot-portrait-close-smiling-600nw-1714666150.jpg",
        reviewText: "The way Wavvy designs its website is amazing. The simplicity-meets-efficiency approach distinguishes it as the prime platform for smooth and uncomplicated communication. If you prioritize efficiency in your messaging experience, Wavvy is the best as staying in touch has never been so easy."
    },
]

const footerLinks = [
    {
        title: "Home",
        links: [
          { title: "Login", url: "/login" },
          { title: "Sign Up", url: "/signup" },
        ],
    }, 
    {
        title: "Resources",
        links: [
          { title: "Privacy Policy", url: "/" },
          { title: "Terms of Conditions", url: "/" },
        ],
    }, 
]

const supportedImageTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/bmp',
    'image/webp',
    'image/tiff',
    'image/svg+xml',
  ];

const supportedVideoTypes = [
    'video/mp4',
    'video/webm',
    'video/ogg',
    'video/avi',
    'video/mpeg',
  ];

export {
    reviews,
    footerLinks,
    supportedImageTypes,
    supportedVideoTypes
}