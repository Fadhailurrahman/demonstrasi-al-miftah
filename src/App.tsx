import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { MenuPage } from './components/MenuPage';
import { MaterialPage } from './components/MaterialPage';
import { materialsData } from './data';

type PageState = 'landing' | 'menu' | 'material';

export default function App() {
  const [activePage, setActivePage] = useState<PageState>('landing');
  const [selectedMaterialId, setSelectedMaterialId] = useState<string | null>(null);

  // Manage forward and backward slideshow navigation
  const handleNavigate = (direction: 'next' | 'prev') => {
    if (!selectedMaterialId) return;
    const currentIndex = materialsData.findIndex((m) => m.id === selectedMaterialId);
    
    if (direction === 'next' && currentIndex < materialsData.length - 1) {
      setSelectedMaterialId(materialsData[currentIndex + 1].id);
    } else if (direction === 'prev' && currentIndex > 0) {
      setSelectedMaterialId(materialsData[currentIndex - 1].id);
    }
  };

  const handleStart = () => {
    setActivePage('menu');
  };

  const handleSelectMaterial = (id: string) => {
    setSelectedMaterialId(id);
    setActivePage('material');
  };

  const handleBackToMenu = () => {
    setActivePage('menu');
  };

  // Find active material item from database
  const currentMaterial = selectedMaterialId
    ? materialsData.find((m) => m.id === selectedMaterialId) || materialsData[0]
    : materialsData[0];

  const currentMaterialIndex = selectedMaterialId
    ? materialsData.findIndex((m) => m.id === selectedMaterialId)
    : 0;

  return (
    <main className="min-h-screen bg-[#faf7f0] text-gray-800 antialiased font-sans">
      {/* Page Routing Switchboard */}
      {activePage === 'landing' && (
        <LandingPage onStart={handleStart} />
      )}

      {activePage === 'menu' && (
        <MenuPage 
          onSelect={handleSelectMaterial} 
          materials={materialsData.map((m) => ({ id: m.id, title: m.title, subTitle: m.subTitle }))} 
        />
      )}

      {activePage === 'material' && (
        <MaterialPage
          material={currentMaterial}
          onBackToMenu={handleBackToMenu}
          onNavigate={handleNavigate}
          currentIndex={currentMaterialIndex}
          totalMaterials={materialsData.length}
        />
      )}
    </main>
  );
}
