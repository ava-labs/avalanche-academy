'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const IndexedDBComponent: React.FC = () => {
  const currentPath = usePathname();

  useEffect(() => {
    const request = indexedDB.open("PathDatabase", 1);

    request.onerror = function (event: any) {
      console.error("Database error:", event.target.errorCode);
    };

    request.onupgradeneeded = function (event: any) {
      const db = event.target.result as IDBDatabase;
      const objectStore = db.createObjectStore("paths", { keyPath: "id", autoIncrement: true });
      objectStore.createIndex("path", "path", { unique: false });
    };

    request.onsuccess = function (event: any) {
      const db = event.target.result as IDBDatabase;
      const transaction = db.transaction(["paths"], "readwrite");
      const objectStore = transaction.objectStore("paths");
      const index = objectStore.index("path");

      const getRequest = index.get(currentPath);

      getRequest.onsuccess = function (event: any) {
        if (event.target.result) {
          console.log("Path already exists in Academy DB:", currentPath);
        } else {
          const addRequest = objectStore.add({ path: currentPath });

          addRequest.onsuccess = function () {
            console.log("Path has been added to Academy DB:", currentPath);
          };

          addRequest.onerror = function (event: any) {
            console.error("Error adding path:", event.target.errorCode);
          };
        }
      };

      getRequest.onerror = function (event: any) {
        console.error("Error checking path:", event.target.errorCode);
      };

      const getAllRequest = objectStore.getAll();

      getAllRequest.onsuccess = function (event: any) {
        const paths = event.target.result as { path: string }[];
        paths.forEach(item => {
          const sidebarItem = document.querySelector(`a[href="${item.path}"]`);
          if (sidebarItem) {
            const iconContainer = sidebarItem.querySelector('div');
            if (iconContainer) {
              iconContainer.style.backgroundColor = 'rgba(55, 82, 172, 0.6)';
              const icon = iconContainer.querySelector('svg'); // Select the SVG icon within the container
              if (icon) {
                icon.style.color = 'white'; // Change icon color to white
              }
            }
          }
        });
      };

      getAllRequest.onerror = function (event: any) {
        console.error("Error retrieving all paths:", event.target.errorCode);
      };
    };
  }, [currentPath]);

  return null;
};

export default IndexedDBComponent;

