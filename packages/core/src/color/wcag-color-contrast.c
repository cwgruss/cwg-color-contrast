#include <stdio.h>
#include <math.h>
#include <emscripten/emscripten.h>

/* Red, green, and blue coefficients */
const float RED_C = 0.2126;
const float GREEN_C = 0.7152;
const float BLUE_C = 0.0722;

struct color {
    unsigned char R;
    unsigned char G;
    unsigned char B;
};

float channelLuminance(int RGBnum) {
    float threshold = 0.03928;
    double sRGB =  ((double) RGBnum/ (double) 255);
    printf("channel luminance of %d is %f \n", RGBnum, sRGB);
    if (sRGB > threshold) {
        sRGB = (sRGB + 0.055) / 1.055; 
        return pow(sRGB, 2.4);
    } 
    return (sRGB/12.92);
}

float calcRelativeLuminance(int redChannel, int greenChannel, int blueChannel) {
    float relLuminance = (RED_C * channelLuminance(redChannel)) 
        + (GREEN_C * channelLuminance(greenChannel)) 
        + (BLUE_C * channelLuminance(blueChannel));
    
    printf("rel of %d, %d, %d, is %f\n\n", redChannel, greenChannel, blueChannel, relLuminance);
    return relLuminance;
}

float luminance(struct color foreground, struct color background) {
    printf("Luminance\n");
    float fLuminance = calcRelativeLuminance(foreground.R, foreground.G, foreground.B);
    float bLuminance = calcRelativeLuminance(background.R, background.G, background.B);

    printf("Color 1 %f \n", fLuminance);
    printf("Color 2 %f\n", bLuminance);
    float L1 = fmin(fLuminance, bLuminance);
    float L2 = fmax(fLuminance, bLuminance);
    return (L1 + 0.05) / (L2 + 0.05);
}

void printArr(int *color) {
    int i;
    for (i = 0; i < 3; i++)
    {
        printf("%d\n", color[i]);
    }
    
}

EMSCRIPTEN_KEEPALIVE
float contrastRatio(int *foreground, int *background) {

    printf("Foreground RED: %d\n", foreground[0]);
    printf("Foreground GREEN: %d\n", foreground[1]);
    printf("Foreground BLUE: %d\n", foreground[2]);
    printf("background RED: %d\n", background[0]);
    printf("background GREEN: %d\n", background[1]);
    printf("background BLUE: %d\n", background[2]);

    struct color FOREGROUND_COLOR;
    struct color BACKGROUND_COLOR;

    FOREGROUND_COLOR.R = foreground[0];
    FOREGROUND_COLOR.G = foreground[1];
    FOREGROUND_COLOR.B = foreground[2];
    
    BACKGROUND_COLOR.R = background[0];
    BACKGROUND_COLOR.G = background[1];
    BACKGROUND_COLOR.B = background[2];

    float ratio = (1 / luminance(FOREGROUND_COLOR, BACKGROUND_COLOR));
    return ratio;
}


