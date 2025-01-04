const About = () => {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Story Section */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h1 className="text-4xl font-bold mb-6">Our Story</h1>
          <p className="text-gray-600 text-lg">
            Founded in 2024, ModernTech has been at the forefront of creating
            innovative digital solutions. Our journey began with a simple mission:
            to make technology accessible and beautiful.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-gray-50 rounded-lg p-8 mb-20">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-gray-600 text-lg">
              We strive to empower businesses and individuals with cutting-edge
              technology solutions that drive growth and success. Through
              innovation and dedication, we help our clients achieve their digital
              goals.
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-12">Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((member) => (
              <div key={member} className="p-6">
                <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Team Member {member}</h3>
                <p className="text-gray-600">Position {member}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;