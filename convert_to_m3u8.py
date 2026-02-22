import json
import re
import os

def normalize_series_data(line, next_line):
    # Regex para extrair tvg-name, logo e group-title
    name_match = re.search(r'tvg-name="([^"]+)"', line)
    logo_match = re.search(r'tvg-logo="([^"]+)"', line)
    group_match = re.search(r'group-title="([^"]+)"', line)
    
    # Extrair o nome que vem depois da última vírgula
    display_name = line.split(',')[-1].strip()
    
    tvg_name = name_match.group(1) if name_match else display_name
    logo = logo_match.group(1) if logo_match else ""
    group = group_match.group(1) if group_match else "Geral"
    
    # Tenta encontrar Padrão S01E01 ou similar para transformar em Série
    # Ex: "Sandy e Junior S01E77" -> "Serie | Sandy e Junior S01", "S01 E77"
    season_ep_match = re.search(r'(.*?)\s+S(\d+)\s?E(\d+)', tvg_name, re.IGNORECASE)
    
    if season_ep_match:
        base_title = season_ep_match.group(1).strip()
        season = season_ep_match.group(2).zfill(2)
        episode = season_ep_match.group(3).zfill(2)
        
        new_group = f"Serie | {base_title} S{season}"
        new_display_name = f"S{season} E{episode}"
        
        return f'#EXTINF:-1 tvg-logo="{logo}" group-title="{new_group}",{new_display_name}\n{next_line}\n'
    
    # Se for filme ou canal comum, mantém o padrão mas limpa o grupo
    return f'#EXTINF:-1 tvg-logo="{logo}" group-title="{group}",{tvg_name}\n{next_line}\n'

def process_current_folder():
    # Detecta a pasta onde o script está sendo executado
    folder_path = os.path.dirname(os.path.abspath(__file__))
    output_filename = os.path.join(folder_path, 'lista_master_completa.m3u8')
    
    m3u_content = ["#EXTM3U\n"]
    files_processed = 0
    total_items = 0

    print(f"🚀 Buscando arquivos JSON em: {folder_path}")

    # Lista arquivos .json na mesma pasta do script
    json_files = [f for f in os.listdir(folder_path) if f.endswith('.json')]
    json_files.sort() # Garante ordem part_01, part_02...

    if not json_files:
        print("❌ Nenhum arquivo .json encontrado na pasta do script!")
        return

    for file_name in json_files:
        file_path = os.path.join(folder_path, file_name)
        
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
            
            lines = data.get('lines', [])
            current_file_items = 0

            # Itera em pares (EXTINF e URL)
            for i in range(0, len(lines) - 1):
                current_line = str(lines[i])
                next_line = str(lines[i+1])
                
                if current_line.startswith('#EXTINF') and next_line.startswith('http'):
                    formatted = normalize_series_data(current_line, next_line)
                    m3u_content.append(formatted)
                    current_file_items += 1
            
            files_processed += 1
            total_items += current_file_items
            print(f"✅ {file_name}: {current_file_items} itens convertidos.")

        except Exception as e:
            print(f"❌ Erro ao processar {file_name}: {e}")

    # Salva o arquivo único final na mesma pasta
    with open(output_filename, 'w', encoding='utf-8') as f:
        f.writelines(m3u_content)
    
    print(f"\n✨ CONCLUÍDO!")
    print(f"📂 Total de arquivos JSON convertidos: {files_processed}")
    print(f"📺 Total de itens no M3U8: {total_items}")
    print(f"💾 Arquivo gerado: {output_filename}")

if __name__ == "__main__":
    process_current_folder()
