import React from 'react';

const HeroBanner = () => {
  return (
    <section className="mx-1 my-1" aria-label="Hero banner">
      <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden border border-border bg-gradient-to-br from-primary/5 to-primary/10">
        {/* Grid Pattern Background */}
        <div className="absolute inset-0 grid grid-cols-6 grid-rows-3 gap-1 p-4 opacity-30">
          {Array.from({ length: 18 }).map((_, i) => (
            <div key={i} className="bg-muted rounded-lg"></div>
          ))}
        </div>
        
        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
          <div className="bg-background/95 backdrop-blur-sm px-4 sm:px-6 py-4 rounded-xl shadow-lg border border-border max-w-md w-full">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-primary-foreground" fill="currentColor" aria-hidden="true">
                    <path d="M12 2L8 6H4v4l-4 4 4 4v4h4l4 4 4-4h4v-4l4-4-4-4V6h-4L12 2zm0 4l2.5 2.5H17v2.5L19.5 12 17 14.5V17h-2.5L12 19.5 9.5 17H7v-2.5L4.5 12 7 9.5V7h2.5L12 4.5z"/>
                  </svg>
                </div>
                <h1 className="font-extrabold text-lg sm:text-xl text-foreground">ELYF EVSPARE</h1>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground font-medium leading-relaxed">
                Premium Electric Vehicle Spare Parts
              </p>
              <p className="text-xs text-muted-foreground mt-2 opacity-75">
                || ALL ITEMS: + GST 18% || EV CHARGERS: +GST 5% ||
              </p>
            </div>
          </div>
        </div>

        {/* Decorative Elements - Hidden on mobile for better performance */}
        <div className="absolute top-4 left-4 w-12 sm:w-16 h-12 sm:h-16 bg-primary/10 rounded-xl hidden sm:block"></div>
        <div className="absolute bottom-4 right-4 w-16 sm:w-20 h-16 sm:h-20 bg-primary/10 rounded-xl hidden sm:block"></div>
        <div className="absolute top-1/2 left-4 sm:left-8 w-8 sm:w-12 h-8 sm:h-12 bg-primary/5 rounded-lg transform -translate-y-1/2 hidden md:block"></div>
        <div className="absolute top-1/2 right-4 sm:right-8 w-8 sm:w-12 h-8 sm:h-12 bg-primary/5 rounded-lg transform -translate-y-1/2 hidden md:block"></div>
      </div>
    </section>
  );
};

export default HeroBanner;
