import React from 'react';

// Sample wildlife population data
const wildlifeData = [
  { id: 1, species: 'Bengal Tiger', population: 2967, coordinates: [78.9629, 20.5937], region: 'Central India' },
  { id: 2, species: 'Asian Elephant', population: 1256, coordinates: [76.2711, 10.8505], region: 'South India' },
  { id: 3, species: 'Snow Leopard', population: 516, coordinates: [77.5946, 32.2432], region: 'Himalayas' },
  { id: 4, species: 'One-horned Rhinoceros', population: 752, coordinates: [91.7362, 26.1433], region: 'Northeast India' },
  { id: 5, species: 'Lion', population: 674, coordinates: [70.6234, 21.1702], region: 'Gujarat' },
];

const WildlifeMap = () => {
  const [selectedPoint, setSelectedPoint] = React.useState<number | null>(null);

  // Calculate the size of the point based on population
  const getPointSize = (population: number) => {
    const baseSize = 8;
    const scale = population / 500; // Adjust scale based on population
    return Math.max(baseSize, Math.min(baseSize * scale, 40)); // Min 8px, max 40px
  };

  // Convert geographic coordinates to relative positions in the container
  const getRelativePosition = (coordinates: number[]) => {
    // Map longitude (65°E to 95°E) and latitude (5°N to 35°N) to container dimensions
    const x = ((coordinates[0] - 65) / (95 - 65)) * 100;
    const y = ((35 - coordinates[1]) / (35 - 5)) * 100;
    return { x, y };
  };

  return (
    <div className="relative w-full h-[calc(100vh-4rem)] bg-cream p-4">
      <div className="absolute inset-4 border-2 border-forest rounded-lg bg-white/50">
        {/* Grid lines */}
        <div className="absolute inset-0 grid grid-cols-6 grid-rows-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={`v-${i}`} className="border-r border-forest/20 h-full" />
          ))}
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={`h-${i}`} className="border-b border-forest/20 w-full" />
          ))}
        </div>

        {/* Points */}
        {wildlifeData.map((animal) => {
          const pos = getRelativePosition(animal.coordinates);
          const size = getPointSize(animal.population);

          return (
            <div
              key={animal.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
              }}
              onMouseEnter={() => setSelectedPoint(animal.id)}
              onMouseLeave={() => setSelectedPoint(null)}
            >
              <div
                className="rounded-full bg-forest transition-all duration-300"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  opacity: selectedPoint === animal.id ? 1 : 0.6,
                }}
              />
              
              {/* Popup */}
              {selectedPoint === animal.id && (
                <div className="absolute z-10 bg-white p-3 rounded-lg shadow-lg -translate-x-1/2 -translate-y-full mb-2 whitespace-nowrap">
                  <h3 className="font-bold text-lg text-forest">{animal.species}</h3>
                  <p className="text-sm text-gray-600">Population: {animal.population}</p>
                  <p className="text-sm text-gray-600">Region: {animal.region}</p>
                  <p className="text-sm text-gray-600">
                    Coordinates: {animal.coordinates[1]}°N, {animal.coordinates[0]}°E
                  </p>
                </div>
              )}
            </div>
          );
        })}

        {/* Coordinate labels */}
        <div className="absolute -bottom-6 left-0 right-0 flex justify-between px-4 text-sm text-forest">
          <span>65°E</span>
          <span>95°E</span>
        </div>
        <div className="absolute -left-6 top-0 bottom-0 flex flex-col justify-between py-4 text-sm text-forest">
          <span>35°N</span>
          <span>5°N</span>
        </div>
      </div>
    </div>
  );
};

export default WildlifeMap;