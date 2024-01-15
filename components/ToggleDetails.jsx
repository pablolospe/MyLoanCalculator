// components/ToggleDetails.js Funcion para matener abierto solo un Dialog
import { useEffect } from 'react';

const ToggleDetails = () => {
  useEffect(() => {
    const allDetails = document.querySelectorAll('details');

    function toggleDetails(index) {
      allDetails.forEach((details, i) => {
        if (i !== index) {
          details.removeAttribute('open');
        }
      });
    }

    allDetails.forEach((details, index) => {
      const summary = details.querySelector('summary');

      if (summary) {
        summary.addEventListener('click', () => {
          toggleDetails(index);
        });
      }
    });

    return () => {
      // Cleanup listeners when component unmounts
      allDetails.forEach((details, index) => {
        const summary = details.querySelector('summary');

        if (summary) {
          summary.removeEventListener('click', () => {
            toggleDetails(index);
          });
        }
      });
    };
  }, []); // Run the effect only once on component mount

  return null;
};

export default ToggleDetails;
