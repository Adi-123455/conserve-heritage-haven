import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Sample wildlife population data
const wildlifeData = [
  { id: 1, species: 'Bengal Tiger', population: 2967, coordinates: [78.9629, 20.5937], region: 'Central India' },
  { id: 2, species: 'Asian Elephant', population: 1256, coordinates: [76.2711, 10.8505], region: 'South India' },
  { id: 3, species: 'Snow Leopard', population: 516, coordinates: [77.5946, 32.2432], region: 'Himalayas' },
  { id: 4, species: 'One-horned Rhinoceros', population: 752, coordinates: [91.7362, 26.1433], region: 'Northeast India' },
  { id: 5, species: 'Lion', population: 674, coordinates: [70.6234, 21.1702], region: 'Gujarat' },
];

const WildlifeMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map
    mapboxgl.accessToken = mapboxToken || 'pk.placeholder'; // Replace with actual token
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/outdoors-v12',
      center: [78.9629, 20.5937], // Center on India
      zoom: 4,
      pitch: 45,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    // Add markers for wildlife populations
    map.current.on('load', () => {
      wildlifeData.forEach((animal) => {
        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
          `<div class="bg-white p-3 rounded-lg shadow-lg">
            <h3 class="font-bold text-lg text-forest">${animal.species}</h3>
            <p class="text-sm text-gray-600">Population: ${animal.population}</p>
            <p class="text-sm text-gray-600">Region: ${animal.region}</p>
          </div>`
        );

        new mapboxgl.Marker({
          color: '#2E7D32',
        })
          .setLngLat(animal.coordinates)
          .setPopup(popup)
          .addTo(map.current!);
      });
    });

    // Cleanup
    return () => {
      map.current?.remove();
    };
  }, [mapboxToken]);

  // Token input field for demo purposes
  const handleTokenInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMapboxToken(e.target.value);
  };

  return (
    <div className="relative w-full h-[calc(100vh-4rem)]">
      {!mapboxToken && (
        <div className="absolute top-0 left-0 right-0 z-10 bg-white p-4 shadow-md">
          <input
            type="text"
            placeholder="Enter your Mapbox token"
            className="w-full p-2 border rounded"
            onChange={handleTokenInput}
          />
          <p className="text-sm text-gray-500 mt-1">
            Visit mapbox.com to get your public token
          </p>
        </div>
      )}
      <div ref={mapContainer} className="absolute inset-0 map-container" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-background/10 rounded-lg" />
    </div>
  );
};

export default WildlifeMap;