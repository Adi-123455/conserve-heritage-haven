import { Link } from "react-router-dom";
import { ArrowRight, Heart, Map, Book } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-screen">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1472396961693-142e6e269027')] bg-cover bg-center">
          <div className="absolute inset-0 hero-gradient" />
        </div>
        <div className="relative pt-32 pb-16 sm:pt-48 lg:pt-64">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="animate-fade-in text-4xl font-bold tracking-tight text-cream sm:text-6xl font-playfair">
                Protecting Our Planet's Wildlife Heritage
              </h1>
              <p className="mt-6 text-lg leading-8 text-cream/90">
                Join us in our mission to conserve and protect the world's most precious flora and fauna. Together, we can make a difference.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link to="/donate">
                  <Button className="bg-sunset hover:bg-sunset-light text-white">
                    Donate Now <Heart className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/map">
                  <Button variant="outline" className="bg-cream/10 hover:bg-cream/20 text-cream border-cream">
                    Explore Map <Map className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 sm:py-32 bg-cream">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-forest sm:text-4xl font-playfair">
              Discover Our Mission
            </h2>
            <p className="mt-6 text-lg leading-8 text-earth">
              Explore the various ways we work to protect and preserve wildlife across the globe.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.name} className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-xl font-semibold leading-7 text-forest">
                    {feature.icon}
                    {feature.name}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-earth">
                    <p className="flex-auto">{feature.description}</p>
                    <p className="mt-6">
                      <Link
                        to={feature.href}
                        className="text-forest hover:text-forest-light flex items-center"
                      >
                        Learn more <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

const features = [
  {
    name: "Wildlife Tracking",
    description: "Real-time monitoring of endangered species across the globe using cutting-edge technology.",
    icon: <Map className="h-5 w-5 text-forest" />,
    href: "/map",
  },
  {
    name: "Conservation Projects",
    description: "Active initiatives to protect and preserve natural habitats and endangered species.",
    icon: <Heart className="h-5 w-5 text-forest" />,
    href: "/projects",
  },
  {
    name: "Research & Education",
    description: "Scientific studies and educational resources to promote understanding and awareness.",
    icon: <Book className="h-5 w-5 text-forest" />,
    href: "/research",
  },
];

export default Index;