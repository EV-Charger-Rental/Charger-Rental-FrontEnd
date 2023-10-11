/* eslint-disable react/prop-types */
import React from 'react';
import './AboutUs.css';


const profiles = [
  {
    name: 'Zainab Malkawi',
    role: 'Full Stack Developer',
    bio: 'Electircal Engineer',
    image: 'https://i.ibb.co/MGC32w6/zainab.png',
    linkedinUrl: 'https://www.linkedin.com/in/zainabmalkawi',
    githubUrl: 'https://github.com/ZainabMalkawi94', // Add GitHub URL for each profile
  },
  {
    name: 'Natali Alkayed',
    role: 'Full Stack Developer',
    bio: "Computer Enginer",
    image: 'https://i.ibb.co/jL36w03/Natali.png',
    linkedinUrl: 'https://www.linkedin.com/in/natali-alkayed-a80b81258',
    githubUrl: 'https://github.com/natali-alkayed', // Add GitHub URL for each profile
  },
  {
    name: 'Mohammad Al-Omari',
    role: 'Full Stack Developer',
    bio: 'Civil Engineer',
    image: 'https://i.ibb.co/3Bb3QjB/omari.png',
    linkedinUrl: 'https://www.linkedin.com/profile-url-3',
    githubUrl: 'https://github.com/Mohammad-Abdelkhaleq', // Add GitHub URL for each profile
  },
  {
    name: 'Mohammad Shawabkeh',
    role: 'Full Stack Developer',
    bio: 'Civil Engineer',
    image: 'https://i.ibb.co/RSfnjhv/shawabkeh.png',
    linkedinUrl: 'https://www.linkedin.com/in/mohammad-shawabkeh-aaab331b2/',
    githubUrl: 'https://github.com/mohamadshawabkeh', // Add GitHub URL for each profile
  }
];
const ProfileCard = ({ name, role, bio, image, linkedinUrl, githubUrl }) => (
  <figure className="snip1515">
    <div className="profile-image">
      <img src={image} alt={name} />
    </div>
    <figcaption>
      <h3>{name}</h3>
      <h4>{role}</h4>
      <p>{bio}</p>
      <div className="icons">
        <a href={linkedinUrl}><i className="ion-social-linkedin"></i></a>
        <a href={githubUrl}><i className="ion-social-github"></i></a>
      </div>
    </figcaption>
  </figure>
);
const AboutUsCom = () => {
  return (
<>
  <div>
    <div className="content-container">
      <h1>Our Team</h1>
    </div>
    <div className="card-container">
      {profiles.map((profile, index) => (
        <ProfileCard key={index} {...profile} />
      ))}
    </div>
  </div>
</>
);
      }
export default AboutUsCom;