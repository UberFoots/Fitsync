import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';

type LayoutType = '1x1' | '2x1' | '3x1';

export const PhotoGallery: React.FC = () => {
  const [layout, setLayout] = useState<LayoutType>('3x1');
  const [photos, setPhotos] = useState<string[]>([]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newPhotos = Array.from(files).map(file => URL.createObjectURL(file));
      setPhotos(prev => [...prev, ...newPhotos].slice(0, 3));
    }
  };

  return (
    <Card className="mt-6">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold">Progress Photos</CardTitle>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setLayout('1x1')}
            className={layout === '1x1' ? 'bg-primary text-primary-foreground' : ''}
          >
            1×1
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setLayout('2x1')}
            className={layout === '2x1' ? 'bg-primary text-primary-foreground' : ''}
          >
            2×1
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setLayout('3x1')}
            className={layout === '3x1' ? 'bg-primary text-primary-foreground' : ''}
          >
            3×1
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className={`grid gap-4 ${
          layout === '1x1' ? 'grid-cols-1' : 
          layout === '2x1' ? 'grid-cols-2' :
          'grid-cols-3'
        }`}>
          {[...Array(layout === '1x1' ? 1 : layout === '2x1' ? 2 : 3)].map((_, index) => (
            <div key={index} className="relative aspect-square">
              {photos[index] ? (
                <img
                  src={photos[index]}
                  alt={`Progress ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <label className="flex items-center justify-center w-full h-full border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handlePhotoUpload}
                  />
                  <Plus className="h-8 w-8 text-gray-400" />
                </label>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};