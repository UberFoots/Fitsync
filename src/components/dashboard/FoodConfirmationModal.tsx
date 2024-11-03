import React from 'react';
import { Modal } from '../ui/modal';
import { Button } from '../ui/button';
import { NutritionInfo } from '@/lib/api/food-service';

interface FoodConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  foodItem: NutritionInfo;
  imagePreview?: string;
}

export const FoodConfirmationModal: React.FC<FoodConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  foodItem,
  imagePreview,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Confirm Food Item</h2>
        
        {imagePreview && (
          <div className="relative w-full h-48 rounded-lg overflow-hidden">
            <img
              src={imagePreview}
              alt="Food preview"
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="space-y-2">
          <h3 className="font-medium">Detected Food:</h3>
          <p className="text-lg">{foodItem.name}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Calories</p>
            <p className="font-medium">{Math.round(foodItem.calories)} kcal</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Serving Size</p>
            <p className="font-medium">{foodItem.serving_size_g}g</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Protein</p>
            <p className="font-medium">{foodItem.protein_g}g</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Carbs</p>
            <p className="font-medium">{foodItem.carbohydrates_total_g}g</p>
          </div>
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onConfirm}>
            Add Food
          </Button>
        </div>
      </div>
    </Modal>
  );
};