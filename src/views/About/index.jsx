import React from 'react';
import { Award, Target, Users, TrendingUp, Star, Linkedin, Twitter, Github } from 'lucide-react';

const About = () => {
  const instructors = [
    {
      name: "Sarah Johnson",
      role: "Lead Forex Instructor",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "Former Wall Street trader with 15+ years experience. Specialized in currency markets and risk management.",
      expertise: ["Forex Trading", "Risk Management", "Market Analysis"],
      rating: 4.9,
      students: 25000,
      social: {
        linkedin: "#",
        twitter: "#"
      }
    },
    {
      name: "Michael Chen",
      role: "Cryptocurrency Expert",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "Blockchain pioneer and crypto trading specialist. Founded multiple DeFi projects and trading platforms.",
      expertise: ["Cryptocurrency", "Blockchain", "DeFi"],
      rating: 4.8,
      students: 18000,
      social: {
        linkedin: "#",
        github: "#"
      }
    },
    {
      name: "Emma Rodriguez",
      role: "Technical Analysis Specialist",
      image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "Quantitative analyst with expertise in algorithmic trading and technical analysis systems.",
      expertise: ["Technical Analysis", "Algorithmic Trading", "Quantitative Analysis"],
      rating: 4.7,
      students: 12000,
      social: {
        linkedin: "#",
        twitter: "#"
      }
    }
  ];

  const values = [
    {
      icon: <Target className="h-8 w-8" />,
      title: "Excellence",
      description: "We strive for the highest quality in education and trading strategies."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Community",
      description: "Building a supportive community of successful traders worldwide."
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Innovation",
      description: "Staying ahead with cutting-edge trading technologies and methods."
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Integrity",
      description: "Honest, transparent, and ethical approach to trading education."
    }
  ];

  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            About TradeMaster
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We're on a mission to democratize trading education and empower individuals to achieve financial independence through comprehensive, practical trading courses.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-300">
              <p>
                Founded in 2019, TradeMaster emerged from a simple observation: most trading education was either too theoretical or too expensive for the average person. Our founders, all successful traders themselves, decided to change that.
              </p>
              <p>
                We started with a vision to create comprehensive, practical trading courses that actually work in real markets. Today, we've helped over 50,000 students achieve their trading goals and build sustainable income streams.
              </p>
              <p>
                Our platform combines cutting-edge technology with proven trading strategies, creating an environment where both beginners and experienced traders can thrive.
              </p>
            </div>
          </div>
          <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
            <h3 className="text-2xl font-bold text-white mb-6">By the Numbers</h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">50,000+</div>
                <div className="text-gray-400">Students Taught</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">98%</div>
                <div className="text-gray-400">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">25+</div>
                <div className="text-gray-400">Expert Instructors</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">5</div>
                <div className="text-gray-400">Years Experience</div>
              </div>
            </div>
          </div>
        </div>

        {/* Mission & Values */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Our Mission & Values</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              We believe everyone deserves access to quality trading education that can transform their financial future.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-gray-800 rounded-2xl p-6 border border-gray-700 text-center">
                <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                <p className="text-gray-400">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Instructors */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Meet Our Expert Instructors</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Learn from industry professionals with decades of combined trading experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {instructors.map((instructor, index) => (
              <div key={index} className="bg-gray-800 rounded-2xl overflow-hidden border border-gray-700">
                <img
                  src={instructor.image}
                  alt={instructor.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{instructor.name}</h3>
                  <p className="text-green-400 font-medium mb-3">{instructor.role}</p>
                  <p className="text-gray-400 mb-4">{instructor.bio}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {instructor.expertise.map(skill => (
                      <span key={skill} className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span>{instructor.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{instructor.students.toLocaleString()} students</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    {instructor.social.linkedin && (
                      <a href={instructor.social.linkedin} className="text-gray-400 hover:text-green-400 transition-colors">
                        <Linkedin className="h-5 w-5" />
                      </a>
                    )}
                    {instructor.social.twitter && (
                      <a href={instructor.social.twitter} className="text-gray-400 hover:text-green-400 transition-colors">
                        <Twitter className="h-5 w-5" />
                      </a>
                    )}
                    {instructor.social.github && (
                      <a href={instructor.social.github} className="text-gray-400 hover:text-green-400 transition-colors">
                        <Github className="h-5 w-5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;