use image::{DynamicImage, GenericImageView, ImageOutputFormat};
use std::error::Error;

const ASCII_CHARS: &str = "@%#*+=-:. ";

pub fn fetch_image_from_url(url: &str) -> Result<DynamicImage, Box<dyn Error>> {
    let response = reqwest::blocking::get(url)?.bytes()?;
    let img = image::load_from_memory(&response)?;
    Ok(img)
}

pub fn convert_to_ascii(img: DynamicImage, width: u32) -> String {
    // Resize the image, maintaining the aspect ratio
    let (w, h) = img.dimensions();
    let aspect_ratio = h as f64 / w as f64;
    let new_height = (aspect_ratio * width as f64) as u32;
    let img = img.resize(width, new_height, image::imageops::FilterType::Nearest);

    // Convert the image to grayscale
    let grayscale = img.to_luma8();

    // Build the ASCII representation
    let mut ascii_art = String::new();
    for (i, pixel) in grayscale.pixels().enumerate() {
        let brightness = pixel[0];  // Get pixel brightness (0-255)
        let ascii_char = map_brightness_to_ascii(brightness);

        ascii_art.push(ascii_char);

        // Add a new line after every width characters
        if (i as u32 + 1) % width == 0 {
            ascii_art.push('\n');
        }
    }

    ascii_art
}

fn map_brightness_to_ascii(brightness: u8) -> char {
    let ascii_index = (brightness as f64 / 255.0 * (ASCII_CHARS.len() - 1) as f64).round() as usize;
    ASCII_CHARS.chars().nth(ascii_index).unwrap()
}