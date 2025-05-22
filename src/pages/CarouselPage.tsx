import { useMemo, useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardImage } from "@/components/ui/card"

import { slides } from "@/lib/slides"
import { cn } from "@/lib/utils"
export default function CarouselPage() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const { leftIndex, rightIndex } = useMemo(() => {
    const leftIndex = (currentIndex - 1 + slides.length) % slides.length
    const rightIndex = (currentIndex + 1) % slides.length
    return { currentIndex, leftIndex, rightIndex }
  }, [currentIndex])

  return (
    <>
      <section className="w-full overflow-hidden flex justify-center items-center gap-4 py-10">
        <Card variant="carouselPreview">
          <CardImage
            src={slides[leftIndex].image}
            alt="preview"
          />
        </Card>
        <Card variant="carouselMain">
          <CardImage
            src={slides[currentIndex].image}
            alt="primary"
          />
        </Card>
        <Card variant="carouselPreview">
          <CardImage
            src={slides[rightIndex].image}
            alt="preview"
          />
        </Card>
      </section>
      <section className="flex flex-col gap-8 justify-center items-center text-center">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold text-red">{slides[currentIndex].title}</h1>
          <p className="w-100">{slides[currentIndex].desc}</p>
        </div>
        <div className="flex justify-center items-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              className={cn(
                "size-2 bg-light-gray rounded-full cursor-pointer",
                currentIndex === index ? "bg-red" : "bg-light-gray",
              )}
              onClick={() => setCurrentIndex(index)}></button>
          ))}
        </div>
        <div className="flex flex-col gap-4 justify-center items-center">
          <Button>
            <p>Create Account</p>
          </Button>
          <div className="flex justify-center items-center gap-1">
            <p>Already have an account?</p>
            <Button
              variant="ghost"
              size="zero"
              className="border-b border-transparent hover:border-red font-medium">
              Sign in
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
