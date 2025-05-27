import { Card, CardImage } from "@/components/ui/card"

interface GalleryProps {
  images: string[]
  userName: string
}

export function ProfileGallery({ images, userName }: GalleryProps) {
  const galleryImages = images.slice(0, 5)

  return (
    <div className="grid grid-cols-6 gap-4">
      {galleryImages.map((imageSrc, index) => (
        <Card
          key={index}
          variant={index < 2 ? "galleryLg" : "gallerySm"}
          onClick={() => {
            console.log(`show detail of ${images[index]}`)
          }}>
          <CardImage
            src={`/${imageSrc}`}
            alt={userName}
          />
        </Card>
      ))}
    </div>
  )
}
