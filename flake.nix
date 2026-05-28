{
  description = "Ambiente de Comando e Controle - Radar Operacional";

  # Define de onde vamos puxar os pacotes (Nixpkgs unstable garante pacotes atualizados)
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
  };

  outputs = { self, nixpkgs }: 
    let
      # Define a arquitetura do seu sistema (mude se estiver usando ARM/Mac)
      system = "x86_64-linux";
      pkgs = import nixpkgs {
	inherit system;
	config = { allowUnfree = true; };
	};
    in 
    {
      devShells.${system}.default = pkgs.mkShell {
        # Aqui vão as ferramentas de sistema que o ambiente precisa
        packages = with pkgs; [
          nodejs_22
	  git
	  mitmproxy
	  android-tools
	  android-studio
	  jdk
	  (vscode.override {
            commandLineArgs = [
              "--enable-features=UseOzonePlatform"
              "--ozone-platform=wayland"
            ];
          })
          # O npm já vem embutido no nodejs_20, mas podemos declarar utilitários extras aqui se precisar no futuro
        ];

        shellHook = ''
          echo "======================================"
          echo "    Sistema de Contagem de Faltas     "
          echo "       V01                            "
          echo "======================================"
        '';
      };
    };
}
