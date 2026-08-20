//! Future Tauri commands live here. Keep media access and credentials native-side.

pub fn run() {
    tauri::Builder::default()
        .run(tauri::generate_context!())
        .expect("error while running LONG VIDEO RETRIEVAL");
}

#[cfg(test)]
mod tests {
    #[test]
    fn native_shell_boundary_is_present() {
        assert_eq!("windows-first", "windows-first");
    }
}
