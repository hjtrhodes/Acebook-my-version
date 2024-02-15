import React from 'react';
import { useMatches, KBarResults } from 'kbar'; // Import necessary dependencies

const RenderResults = () => {
  const { results } = useMatches(); // Retrieve search results using useMatches hook

  return (
    <KBarResults
      items={results} // Pass the search results to the KBarResults component
      onRender={({ item, active }) => ( // Define how each item should be rendered
        typeof item === 'string' ? ( // Check if the item is a string
          <div>{item}</div> // Render the item as a div
        ) : (
          <div // Render the item with background color based on active state
            style={{
              background: active ? '#eee' : 'transparent',
            }}
          >
            {item.name}
          </div>
        )
      )}
    />
  );
};

export default RenderResults; // Export the RenderResults component
