

interface TextRatingProps {
  textRating: string;
}

const TextRating: React.FC<TextRatingProps> = ({ textRating }) => {
  return <div className='text-xs text-color-tertiary'>{textRating}</div>;
};

export default TextRating;
