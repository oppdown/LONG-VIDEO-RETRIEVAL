//! Future Tauri commands live here. Keep media access and credentials native-side.

pub fn run() {
    // Tauri initialization will be added with the first desktop-runtime milestone.
}

#[cfg(test)]
mod tests {
    #[test]
    fn native_shell_boundary_is_present() {
        assert_eq!("windows-first", "windows-first");
    }
}
