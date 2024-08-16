

import { Button } from "~/components/ui-custom/MyButton";
import { Heart } from "lucide-react";
import { useState } from "react";

interface FavoriteButtonProps {
  isFavorite?: boolean;
}
const FavoriteButton: React.FC<FavoriteButtonProps> = (props) => {
  // Az állapot kezdeti értékének beállítása a props-ból jövő értékre.
  const [favorite, setFavorite] = useState(props.isFavorite);

  // Kattintás eseménykezelő, ami megfordítja a kedvenc állapotot.
  const toggleFavorite = () => {
    setFavorite(!favorite);
  };

  return (
    <div className='absolute right-2 top-2'>
      <Button
        className={favorite ? "text-color-is-favorite" : "text-color-primary"}
        variant={"ghost"}
        size={"icon"}
        onClick={toggleFavorite} // Eseménykezelő hozzáadása
      >
        <div className='sr-only'>Kedvenc</div>
        <Heart
          fill={favorite ? "currentColor" : "none"}
          stroke={favorite ? "currentColor" : "currentColor"}
          className='h-4 w-4'
        />
      </Button>
    </div>
  );
};

export default FavoriteButton;
