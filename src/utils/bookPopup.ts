  
export const getPopupHTML = (book_properties: any) => {
    return `
      <div class="text-center p-2 font-sans rounded-lg bg-white">
        <h3 class="text-lg font-bold text-gray-800">${book_properties.title}</h3>
        <p class="text-sm text-gray-600 italic">by ${book_properties.author}</p>
        <div class="bg-gray-50 p-3 mt-2 rounded-md">
         <p class="mt-2 text-sm font-semibold ${
          book_properties.status === "Available" 
            ? "text-green-600" 
            : "text-red-600"}">${book_properties.status}</p>
          <p class="text-sm text-gray-700"><span class="font-semibold">Owner:</span> ${book_properties.owner}</p>
          <p class="text-sm text-gray-700"><span class="font-semibold">Format:</span> ${book_properties.format}</p>
        </div>
      </div>`;
  };
  