{ pkgs }: {
    deps = [
      pkgs.bun
      pkgs.unzip
        pkgs.yarn
        pkgs.esbuild
        pkgs.nodejs-18_x

        pkgs.nodePackages.typescript
        pkgs.nodePackages.typescript-language-server
    ];
}