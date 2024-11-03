import React, { useState, useEffect, useRef } from 'react';
import { Search, Camera } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { searchFood, recognizeFoodFromImage, type NutritionInfo } from '@/lib/api/food-service';
import { useNutritional } from './NutritionalContext';
import { motion, AnimatePresence } from 'framer-motion';
import { debounce } from 'lodash';
import { FoodConfirmationModal } from './FoodConfirmationModal';

export const FoodSearch = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<NutritionInfo[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isProcessingImage, setIsProcessingImage] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedFoodItem, setSelectedFoodItem] = useState<NutritionInfo | null>(null);
  const [imagePreview, setImagePreview] = useState<string | undefined>();
  const { addFoodItem } = useNutritional();
  const searchRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchSuggestions = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setSuggestions([]);
      return;
    }

    try {
      const result = await searchFood(searchQuery);
      setSuggestions(result.items.slice(0, 5));
      setShowSuggestions(true);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
    }
  };

  const debouncedFetchSuggestions = debounce(fetchSuggestions, 300);

  useEffect(() => {
    debouncedFetchSuggestions(query);
    return () => debouncedFetchSuggestions.cancel();
  }, [query]);

  const handleSearch = async (item: NutritionInfo) => {
    setIsSearching(true);
    setShowSuggestions(false);
    try {
      addFoodItem(item);
      setQuery('');
      setSuggestions([]);
    } catch (error) {
      console.error('Error adding food:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (suggestions.length > 0) {
      handleSearch(suggestions[0]);
    }
  };

  const handleImageCapture = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsProcessingImage(true);
    try {
      // Create image preview
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);

      const result = await recognizeFoodFromImage(file);
      if (result.items.length > 0) {
        setSelectedFoodItem(result.items[0]);
        setShowConfirmationModal(true);
      } else {
        throw new Error('No food items recognized in the image');
      }
    } catch (error) {
      console.error('Error processing image:', error);
      // Show an error toast or notification here
    } finally {
      setIsProcessingImage(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleConfirmFood = () => {
    if (selectedFoodItem) {
      addFoodItem(selectedFoodItem);
      setShowConfirmationModal(false);
      setSelectedFoodItem(null);
      setImagePreview(undefined);
    }
  };

  return (
    <div ref={searchRef} className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            className="pl-10"
            placeholder="Search food (e.g., Chicken fried rice)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={isSearching || isProcessingImage}
            onFocus={() => setShowSuggestions(true)}
          />
          <AnimatePresence>
            {showSuggestions && suggestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700"
              >
                {suggestions.map((item, index) => (
                  <motion.button
                    key={`${item.name}-${index}`}
                    type="button"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 first:rounded-t-md last:rounded-b-md dark:hover:bg-gray-700 dark:focus:bg-gray-700"
                    onClick={() => handleSearch(item)}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{item.name}</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {Math.round(item.calories)} cal
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {item.serving_size_g}g serving
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={handleImageCapture}
          disabled={isProcessingImage}
          className="relative overflow-hidden"
        >
          {isProcessingImage ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full"
            />
          ) : (
            <Camera className="h-4 w-4" />
          )}
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={handleImageUpload}
        />
        <Button type="submit" disabled={isSearching || isProcessingImage}>
          Add
        </Button>
      </form>

      {selectedFoodItem && (
        <FoodConfirmationModal
          isOpen={showConfirmationModal}
          onClose={() => {
            setShowConfirmationModal(false);
            setSelectedFoodItem(null);
            setImagePreview(undefined);
          }}
          onConfirm={handleConfirmFood}
          foodItem={selectedFoodItem}
          imagePreview={imagePreview}
        />
      )}
    </div>
  );
};