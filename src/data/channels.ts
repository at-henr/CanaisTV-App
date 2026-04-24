import type { Channel } from '../types/channel';
import { restrictedChannels, restrictedCategories } from './restrictedChannels';

const getFallbackLogo = (_name: string) => {
  return ''; 
};

// LISTA MESTRA DE CANAIS (COM ASSETS LOCAIS CONFIGURADOS)
const rawChannels = [
  // === FILMES ===
  { id: 'hbo', name: 'HBO', url: 'https://canais.fazoeli.co.za/fontes/smart/hbo.m3u8', category: 'Filmes', logo: 'assets/Imagens/imgi_88_hbo.png' },
  { id: 'hbo2', name: 'HBO 2', url: 'https://canais.fazoeli.co.za/fontes/smart/hbo2.m3u8', category: 'Filmes', logo: 'assets/Imagens/imgi_89_hbo2.png' },
  { id: 'hbo-family', name: 'HBO Family', url: 'https://canais.fazoeli.co.za/fontes/smart/hbofamily.m3u8', category: 'Filmes', logo: 'assets/Imagens/imgi_90_hbofamily.png' },
  { id: 'hbo-mundi', name: 'HBO Mundi', url: 'https://canais.fazoeli.co.za/fontes/smart/hbomundi.m3u8', category: 'Filmes', logo: 'assets/Imagens/imgi_92_hbomundi.png' },
  { id: 'hbo-pop', name: 'HBO Pop', url: 'https://canais.fazoeli.co.za/fontes/smart/hbopop.m3u8', category: 'Filmes', logo: 'assets/Imagens/imgi_94_hbopop.png' },
  { id: 'hbo-xtreme', name: 'HBO Xtreme', url: 'https://canais.fazoeli.co.za/fontes/smart/hboxtreme.m3u8', category: 'Filmes', logo: 'assets/Imagens/imgi_96_hboxtreme.png' },
  { id: 'hbo-plus', name: 'HBO Plus', url: 'https://canais.fazoeli.co.za/fontes/smart/hboplus.m3u8', category: 'Filmes', logo: 'assets/Imagens/imgi_93_hboplus.png' },
  { id: 'tcm', name: 'TCM', url: 'https://canais.fazoeli.co.za/fontes/smart/tcm.m3u8', category: 'Filmes', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fe/TCM_logo_Latin_America.png' }, // Sem asset local na lista, mantido url
  { id: 'space', name: 'Space', url: 'https://canais.fazoeli.co.za/fontes/smart/space.m3u8', category: 'Filmes', logo: 'assets/Imagens/imgi_142_space.png' },
  { id: 'cinemax', name: 'Cinemax', url: 'https://canais.fazoeli.co.za/fontes/smart/cinemax.m3u8', category: 'Filmes', logo: 'assets/Imagens/imgi_40_cinemax.png' },
  { id: 'megapix', name: 'Megapix', url: 'https://canais.fazoeli.co.za/fontes/smart/megapix.m3u8', category: 'Filmes', logo: 'assets/Imagens/imgi_105_megapix.png' },
  { id: 'studio-universal', name: 'Studio Universal', url: 'https://canais.fazoeli.co.za/fontes/smart/studiouniversal.m3u8', category: 'Filmes', logo: 'assets/Imagens/imgi_150_studiouniversal.png' },
  { id: 'telecine-fun', name: 'Telecine Fun', url: 'https://canais.fazoeli.co.za/fontes/smart/telecinefun.m3u8', category: 'Filmes', logo: 'assets/Imagens/imgi_154_telecinefun.png' },
  { id: 'telecine-touch', name: 'Telecine Touch', url: 'https://canais.fazoeli.co.za/fontes/smart/telecinetouch.m3u8', category: 'Filmes', logo: 'assets/Imagens/imgi_157_telecinetouch.png' },
  { id: 'telecine-cult', name: 'Telecine Cult', url: 'https://canais.fazoeli.co.za/fontes/smart/telecinecult.m3u8', category: 'Filmes', logo: 'assets/Imagens/imgi_153_telecinecult.png' },
  { id: 'telecine-action', name: 'Telecine Action', url: 'https://canais.fazoeli.co.za/fontes/smart/telecineaction.m3u8', category: 'Filmes', logo: 'assets/Imagens/imgi_152_telecineaction.png' },
  { id: 'telecine-premium', name: 'Telecine Premium', url: 'https://canais.fazoeli.co.za/fontes/smart/telecinepremium.m3u8', category: 'Filmes', logo: 'assets/Imagens/imgi_156_telecinepremium.png' },
  { id: 'telecine-pipoca', name: 'Telecine Pipoca', url: 'https://canais.fazoeli.co.za/fontes/smart/telecinepipoca.m3u8', category: 'Filmes', logo: 'assets/Imagens/imgi_155_telecinepipoca.png' },

  // === SERIES ===
  { id: 'warner', name: 'Warner Channel', url: 'https://canais.fazoeli.co.za/fontes/smart/warnerchannel.m3u8', category: 'Series', logo: 'assets/Imagens/imgi_179_warnerchannel.png' },
  { id: 'tnt', name: 'TNT', url: 'https://canais.fazoeli.co.za/fontes/smart/tnt.m3u8', category: 'Series', logo: 'assets/Imagens/imgi_160_tnt.png' },
  { id: 'tnt-novelas', name: 'TNT Novelas', url: 'https://canais.fazoeli.co.za/fontes/smart/tntnovelas.m3u8', category: 'Series', logo: 'assets/Imagens/imgi_161_tntnovelas.png' },
  { id: 'tnt-series', name: 'TNT Séries', url: 'https://canais.fazoeli.co.za/fontes/smart/tntseries.m3u8', category: 'Series', logo: 'assets/Imagens/imgi_162_tntseries.png' },
  { id: 'axn', name: 'AXN', url: 'https://canais.fazoeli.co.za/fontes/smart/axn.m3u8', category: 'Series', logo: 'assets/Imagens/imgi_12_axn.png' },
  { id: 'sony', name: 'Sony Channel', url: 'https://canais.fazoeli.co.za/fontes/smart/sonychannel.m3u8', category: 'Series', logo: 'assets/Imagens/imgi_140_sonychannel.png' },
  { id: 'universal-tv', name: 'Universal TV', url: 'https://canais.fazoeli.co.za/fontes/smart/universaltv.m3u8', category: 'Series', logo: 'assets/Imagens/imgi_176_universaltv.png' },
  { id: 'ae', name: 'A&E', url: 'https://canais.fazoeli.co.za/fontes/smart/ae.m3u8', category: 'Series', logo: 'assets/Imagens/imgi_3_ae.png' },
  { id: 'amc', name: 'AMC', url: 'https://canais.fazoeli.co.za/fontes/smart/amc.m3u8', category: 'Series', logo: 'assets/Imagens/imgi_8_amc.png' },

  // === ESPORTES ===
  { id: 'sportv', name: 'SporTV', url: 'https://canais.fazoeli.co.za/fontes/smart/sportv.m3u8', category: 'Esportes', logo: 'assets/Imagens/imgi_143_sportv.png' },
  { id: 'sportv2', name: 'SporTV 2', url: 'https://canais.fazoeli.co.za/fontes/smart/sportv2.m3u8', category: 'Esportes', logo: 'assets/Imagens/imgi_144_sportv2.png' },
  { id: 'sportv3', name: 'SporTV 3', url: 'https://canais.fazoeli.co.za/fontes/smart/sportv3.m3u8', category: 'Esportes', logo: 'assets/Imagens/imgi_145_sportv3.png' },
  { id: 'sportv4', name: 'SporTV 4', url: 'https://canais.fazoeli.co.za/fontes/smart/sportv4.m3u8', category: 'Esportes', logo: 'assets/Imagens/imgi_143_sportv.png' },
  { id: 'espn', name: 'ESPN', url: 'https://canais.fazoeli.co.za/fontes/smart/espn.m3u8', category: 'Esportes', logo: 'assets/Imagens/imgi_67_espn.png' },
  { id: 'espn2', name: 'ESPN 2', url: 'https://canais.fazoeli.co.za/fontes/smart/espn2.m3u8', category: 'Esportes', logo: 'assets/Imagens/imgi_70_espn4.png' },
  { id: 'espn3', name: 'ESPN 3', url: 'https://canais.fazoeli.co.za/fontes/smart/espn3.m3u8', category: 'Esportes', logo: 'assets/Imagens/imgi_69_espn3.png' },
  { id: 'espn4', name: 'ESPN 4', url: 'https://canais.fazoeli.co.za/fontes/smart/espn4.m3u8', category: 'Esportes', logo: 'assets/Imagens/imgi_70_espn4.png' },
  { id: 'espn5', name: 'ESPN 5', url: 'https://canais.fazoeli.co.za/fontes/smart/espn5.m3u8', category: 'Esportes', logo: 'assets/Imagens/imgi_71_espn5.png' },
  { id: 'premiere', name: 'Premiere', url: 'https://canais.fazoeli.co.za/fontes/smart/premiere.m3u8', category: 'Esportes', logo: 'assets/Imagens/imgi_121_premiere.png' },
  { id: 'premiere2', name: 'Premiere 2', url: 'https://canais.fazoeli.co.za/fontes/smart/premiere2.m3u8', category: 'Esportes', logo: 'assets/Imagens/imgi_121_premiere.png' },
  { id: 'premiere3', name: 'Premiere 3', url: 'https://canais.fazoeli.co.za/fontes/smart/premiere3.m3u8', category: 'Esportes', logo: 'assets/Imagens/imgi_121_premiere.png' },
  { id: 'premiere4', name: 'Premiere 4', url: 'https://canais.fazoeli.co.za/fontes/smart/premiere4.m3u8', category: 'Esportes', logo: 'assets/Imagens/imgi_121_premiere.png' },
  { id: 'combate', name: 'Combate', url: 'https://canais.fazoeli.co.za/fontes/smart/combate.m3u8', category: 'Esportes', logo: 'assets/Imagens/imgi_44_combate.png' },
  { id: 'band-sports', name: 'Band Sports', url: 'https://canais.fazoeli.co.za/fontes/smart/bandsports.m3u8', category: 'Esportes', logo: 'assets/Imagens/imgi_16_bandsports.png' },
  { id: 'fifa-plus', name: 'FIFA+ Português', url: 'https://e3be9ac5.wurl.com/master/f36d25e7e52f1ba8d7e56eb859c636563214f541/TEctYnJfRklGQVBsdXNQb3J0dWd1ZXNlX0hMUw/playlist.m3u8', category: 'Esportes', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/FIFA%2B_(2025).svg/700px-FIFA%2B_(2025).svg.png' },
  { id: 'canal-do-inter', name: 'Canal do Inter', url: 'https://video01.soultv.com.br/internacional/internacional/playlist.m3u8', category: 'Esportes', logo: 'https://i.imgur.com/TQFWEIS.png' },


  // === TV ABERTA ===
  { id: 'globo-sp', name: 'Globo SP', url: 'https://canais.fazoeli.co.za/fontes/smart/globosp.m3u8', category: 'TV Aberta', logo: 'assets/Imagens/imgi_80_globo.png' },
  { id: 'globo-rj', name: 'Globo RJ', url: 'https://canais.fazoeli.co.za/fontes/smart/globorj.m3u8', category: 'TV Aberta', logo: 'assets/Imagens/imgi_80_globo.png' },
  { id: 'sbt', name: 'SBT', url: 'https://canais.fazoeli.co.za/fontes/smart/sbt.m3u8', category: 'TV Aberta', logo: 'assets/Imagens/imgi_139_sbt.png' },
  { id: 'record', name: 'Record TV', url: 'https://canais.fazoeli.co.za/fontes/smart/record.m3u8', category: 'TV Aberta', logo: 'assets/Imagens/imgi_133_record.png' },
  { id: 'band', name: 'Band', url: 'https://canais.fazoeli.co.za/fontes/smart/band.m3u8', category: 'TV Aberta', logo: 'assets/Imagens/imgi_14_band.png' },
  { id: 'redetv', name: 'RedeTV!', url: 'https://canais.fazoeli.co.za/fontes/smart/redetv.m3u8', category: 'TV Aberta', logo: 'assets/Imagens/imgi_137_redetv.png' },
  { id: 'tv-brasil', name: 'TV Brasil', url: 'https://canais.fazoeli.co.za/fontes/smart/tvbrasil.m3u8', category: 'TV Aberta', logo: 'assets/Imagens/imgi_138_redevida.png' }, // Usando redevida provisório se não tiver brasil
  { id: 'cultura', name: 'TV Cultura', url: 'https://canais.fazoeli.co.za/fontes/smart/cultura.m3u8', category: 'TV Aberta', logo: 'assets/Imagens/imgi_169_tvcultura.png' },
  { id: 'aparecida', name: 'TV Aparecida', url: 'https://canais.fazoeli.co.za/fontes/smart/aparecida.m3u8', category: 'TV Aberta', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/TV_Aparecida_logo.png/640px-TV_Aparecida_logo.png' },
  { id: 'impd', name: 'IMPD', url: 'https://68882bdaf156a.streamlock.net/impd/ngrp:impd_all/playlist.m3u8', category: 'TV Aberta', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/1c/Logotipo_da_Rede_Mundial.jpg' },
  { id: 'amazon-sat', name: 'Amazon Sat', url: 'https://amazonsat.brasilstream.com.br/hls/amazonsat/index.m3u8', category: 'TV Aberta', logo: 'https://i.imgur.com/7rjCS5i.png' },
  { id: 'sbt-interior', name: 'SBT Interior', url: 'https://cdn.jmvstream.com/w/LVW-10801/LVW10801_Xvg4R0u57n/playlist.m3u8', category: 'TV Aberta', logo: 'https://i.imgur.com/IkZfa4j.png' },
  { id: 'sertao-tv', name: 'Sertão TV', url: 'http://wz4.dnip.com.br/sertaotv/sertaotv.sdp/playlist.m3u8', category: 'TV Aberta', logo: 'https://i.imgur.com/b5xOCsC.png' },
  { id: 'cwb-tv', name: 'CWB TV', url: 'https://59d39900ebfb8.streamlock.net/cwbtv/cwbtv/playlist.m3u8', category: 'TV Aberta', logo: 'https://i.imgur.com/S0ISpmU.png' },
  { id: 'record-internacional', name: 'Record Internacional', url: 'https://viamotionhsi.netplus.ch/live/eds/rederecordinternacional/browser-HLS8/rederecordinternacional.m3u8', category: 'TV Aberta', logo: 'https://i.imgur.com/sz9gTTr.png' },
  { id: 'novo-tempo', name: 'TV Novo Tempo', url: 'https://stream.live.novotempo.com/tv/smil:tvnovotempo.smil/playlist.m3u8', category: 'TV Aberta', logo: 'https://i.postimg.cc/mgpGyqRg/novotempo.png' },
  { id: 'rede-gospel', name: 'Rede Gospel', url: 'https://redegospel-aovivo.nuvemplay.live/hls/stream.m3u8', category: 'TV Aberta', logo: 'https://i.imgur.com/mttSwgO.png' },  { id: 'sbt-interior', name: 'SBT Interior', url: 'https://cdn.jmvstream.com/w/LVW-10801/LVW10801_Xvg4R0u57n/playlist.m3u8', category: 'TV Aberta', logo: 'https://i.imgur.com/IkZfa4j.png' },
  { id: 'amazon-sat', name: 'Amazon Sat', url: 'https://amazonsat.brasilstream.com.br/hls/amazonsat/index.m3u8', category: 'TV Aberta', logo: 'https://i.imgur.com/7rjCS5i.png' },

  // === NOTICIAS ===
  { id: 'globo-news', name: 'Globo News', url: 'https://canais.fazoeli.co.za/fontes/smart/globonews.m3u8', category: 'Noticias', logo: 'assets/Imagens/imgi_81_globonews.png' },
  { id: 'cnn-brasil', name: 'CNN Brasil', url: 'https://canais.fazoeli.co.za/fontes/smart/cnnbrasil.m3u8', category: 'Noticias', logo: 'assets/Imagens/imgi_42_cnnbrasil.png' },
  { id: 'band-news', name: 'Band News', url: 'https://canais.fazoeli.co.za/fontes/smart/bandnews.m3u8', category: 'Noticias', logo: 'assets/Imagens/imgi_15_bandnews.png' },
  { id: 'record-news', name: 'Record News', url: 'https://canais.fazoeli.co.za/fontes/smart/recordnews.m3u8', category: 'Noticias', logo: 'assets/Imagens/imgi_134_recordnews.png' },
  { id: 'jovem-pan', name: 'Jovem Pan News', url: 'https://d6yfbj4xxtrod.cloudfront.net/out/v1/7836eb391ec24452b149f3dc6df15bbd/index.m3u8', category: 'Noticias', logo: 'assets/Imagens/logo_15424.png' },
  { id: 'sbt-news', name: 'SBT News', url: 'https://embedflix.gold/tv/player.php?id=sbt-news', category: 'Noticias', logo: 'assets/Imagens/sbtnews.png' },
  { id: 'stz-tv', name: 'STZ TV', url: 'https://cdn.live.br1.jmvstream.com/webtv/AVJ-12952/playlist/playlist.m3u8', category: 'Noticias', logo: 'https://i.imgur.com/SeF2I7q.png' },


  // === INFANTIL ===
  { id: 'gloob', name: 'Gloob', url: 'https://canais.fazoeli.co.za/fontes/smart/gloob.m3u8', category: 'Infantil', logo: 'assets/Imagens/imgi_84_gloob.png' },
  { id: 'cartoon-network', name: 'Cartoon Network', url: 'https://canais.fazoeli.co.za/fontes/smart/cartoonnetwork.m3u8', category: 'Infantil', logo: 'assets/Imagens/imgi_36_cartoonnetwork.png' },
  { id: 'cartoonito', name: 'Cartoonito', url: 'https://canais.fazoeli.co.za/fontes/smart/cartoonito.m3u8', category: 'Infantil', logo: 'assets/Imagens/imgi_35_cartoonito.png' },
  { id: 'discovery-kids', name: 'Discovery Kids', url: 'https://canais.fazoeli.co.za/fontes/smart/discoverykids.m3u8', category: 'Infantil', logo: 'assets/Imagens/imgi_51_discoverykids.png' },
  { id: 'nickelodeon', name: 'Nickelodeon', url: 'https://canais.fazoeli.co.za/fontes/smart/nickelodeon.m3u8', category: 'Infantil', logo: 'assets/Imagens/imgi_113_nickelodeon.png' },
  { id: 'geekdot', name: 'Geekdot', url: 'https://stream.ichibantv.com:3764/hybrid/play.m3u8', category: 'Infantil', logo: 'https://i.imgur.com/jML1u4O.png' },
  { id: 'adult-swim', name: 'Adult Swim', url: 'https://canais.fazoeli.co.za/fontes/smart/adultswim.m3u8', category: 'Infantil', logo: 'assets/Imagens/imgi_2_adultswim.png' },

  // === DOCUMENTARIOS ===
  { id: 'discovery', name: 'Discovery Channel', url: 'https://canais.fazoeli.co.za/fontes/smart/discoverychannel.m3u8', category: 'Documentarios', logo: 'assets/Imagens/imgi_49_discoverychannel.png' },
  { id: 'discovery-turbo', name: 'Discovery Turbo', url: 'https://canais.fazoeli.co.za/fontes/smart/discoveryturbo.m3u8', category: 'Documentarios', logo: 'assets/Imagens/imgi_54_discoveryturbo.png' },
  { id: 'discovery-id', name: 'Discovery ID', url: 'https://canais.fazoeli.co.za/fontes/smart/discoveryid.m3u8', category: 'Documentarios', logo: 'assets/Imagens/imgi_100_id.png' },
  { id: 'discovery-world', name: 'Discovery World', url: 'https://canais.fazoeli.co.za/fontes/smart/discoveryworld.m3u8', category: 'Documentarios', logo: 'assets/Imagens/imgi_55_discoveryworld.png' },
  { id: 'discovery-science', name: 'Discovery Science', url: 'https://canais.fazoeli.co.za/fontes/smart/discoveryscience.m3u8', category: 'Documentarios', logo: 'assets/Imagens/imgi_52_discoveryscience.png' },
  { id: 'discovery-hh', name: 'Discovery H&H', url: 'https://canais.fazoeli.co.za/fontes/smart/discoveryhh.m3u8', category: 'Documentarios', logo: 'assets/Imagens/imgi_50_discoveryhh.png' },
  { id: 'animal-planet', name: 'Animal Planet', url: 'https://canais.fazoeli.co.za/fontes/smart/animalplanet.m3u8', category: 'Documentarios', logo: 'assets/Imagens/imgi_9_animalplanet.png' },
  { id: 'history', name: 'History', url: 'https://canais.fazoeli.co.za/fontes/smart/history.m3u8', category: 'Documentarios', logo: 'assets/Imagens/imgi_98_history.png' },
  { id: 'history2', name: 'History 2', url: 'https://canais.fazoeli.co.za/fontes/smart/history2.m3u8', category: 'Documentarios', logo: 'assets/Imagens/imgi_99_history2.png' },
  { id: 'food-network', name: 'Food Network', url: 'https://canais.fazoeli.co.za/fontes/smart/foodnetwork.m3u8', category: 'Documentarios', logo: 'assets/Imagens/imgi_76_foodnetwork.png' },
  { id: 'hgtv', name: 'HGTV', url: 'https://canais.fazoeli.co.za/fontes/smart/hgtv.m3u8', category: 'Documentarios', logo: 'assets/Imagens/imgi_97_hgtv.png' },
  { id: 'tlc', name: 'TLC', url: 'https://canais.fazoeli.co.za/fontes/smart/tlc.m3u8', category: 'Documentarios', logo: 'assets/Imagens/imgi_159_tlc.png' },

  // === ENTRETENIMENTO ===
  { id: 'multishow', name: 'Multishow', url: 'https://canais.fazoeli.co.za/fontes/smart/multishow.m3u8', category: 'Entretenimento', logo: 'assets/Imagens/imgi_110_multishow.png' },
  { id: 'bis', name: 'BIS', url: 'https://canais.fazoeli.co.za/fontes/smart/bis.m3u8', category: 'Entretenimento', logo: 'assets/Imagens/imgi_26_bis.png' },
  { id: 'viva', name: 'Viva', url: 'https://canais.fazoeli.co.za/fontes/smart/viva.m3u8', category: 'Entretenimento', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Canal_Viva_2018_wordmark.svg/960px-Canal_Viva_2018_wordmark.svg.png' },
  { id: 'off', name: 'OFF', url: 'https://canais.fazoeli.co.za/fontes/smart/off.m3u8', category: 'Entretenimento', logo: 'assets/Imagens/imgi_27_canaloff.png' },
  { id: 'gnt', name: 'GNT', url: 'https://canais.fazoeli.co.za/fontes/smart/gnt.m3u8', category: 'Entretenimento', logo: 'assets/Imagens/imgi_86_gnt.png' },
  { id: 'arte1', name: 'Arte 1', url: 'https://canais.fazoeli.co.za/fontes/smart/arte1.m3u8', category: 'Entretenimento', logo: 'assets/Imagens/imgi_11_arte1.png' },

  // === 24H (CATEGORIA PRÓPRIA) ===
  { id: '24h-simpsons', name: '24h Simpsons', url: 'https://canais.fazoeli.co.za/fontes/smart/24h_simpsons.m3u8', category: '24h', logo: 'assets/Imagens/24h.png' },
  { id: '24h-dragonball', name: '24h Dragon Ball', url: 'https://canais.fazoeli.co.za/fontes/smart/24h_dragonball.m3u8', category: '24h', logo: 'assets/Imagens/24h.png' },
  { id: '24h-odeia-chris', name: '24h Todo Mundo Odeia o Chris', url: 'https://canais.fazoeli.co.za/fontes/smart/24h_odeiachris.m3u8', category: '24h', logo: 'assets/Imagens/24h.png' },

  // === REALITY (BBB) ===
  { id: 'bbb-mosaico', name: 'BBB Mosaico', url: 'https://www1.embedtv.best/bbbmosaico', category: 'Reality', logo: 'assets/Imagens/imgi_19_bbb2.png' },
  { id: 'bbb1', name: 'BBB 1', url: 'https://canais.fazoeli.co.za/fontes/smart/bbb1.m3u8', category: 'Reality', logo: 'assets/Imagens/imgi_19_bbb2.png' },
  { id: 'bbb2', name: 'BBB 2', url: 'https://canais.fazoeli.co.za/fontes/smart/bbb2.m3u8', category: 'Reality', logo: 'assets/Imagens/imgi_19_bbb2.png' },
  { id: 'bbb3', name: 'BBB 3', url: 'https://canais.fazoeli.co.za/fontes/smart/bbb3.m3u8', category: 'Reality', logo: 'assets/Imagens/imgi_19_bbb2.png' },
  { id: 'bbb4', name: 'BBB 4', url: 'https://canais.fazoeli.co.za/fontes/smart/bbb4.m3u8', category: 'Reality', logo: 'assets/Imagens/imgi_19_bbb2.png' },
  { id: 'bbb5', name: 'BBB 5', url: 'https://canais.fazoeli.co.za/fontes/smart/bbb5.m3u8', category: 'Entretenimento', logo: 'assets/Imagens/imgi_19_bbb2.png' },
  { id: 'bbb6', name: 'BBB 6', url: 'https://canais.fazoeli.co.za/fontes/smart/bbb6.m3u8', category: 'Entretenimento', logo: 'assets/Imagens/imgi_19_bbb2.png' },
  { id: 'bbb7', name: 'BBB 7', url: 'https://canais.fazoeli.co.za/fontes/smart/bbb7.m3u8', category: 'Entretenimento', logo: 'assets/Imagens/imgi_19_bbb2.png' },
  { id: 'bbb8', name: 'BBB 8', url: 'https://canais.fazoeli.co.za/fontes/smart/bbb8.m3u8', category: 'Entretenimento', logo: 'assets/Imagens/imgi_19_bbb2.png' },
  { id: 'bbb9', name: 'BBB 9', url: 'https://canais.fazoeli.co.za/fontes/smart/bbb9.m3u8', category: 'Entretenimento',logo: 'assets/Imagens/imgi_19_bbb2.png' },
  { id: 'bbb10', name: 'BBB 10', url: 'https://canais.fazoeli.co.za/fontes/smart/bbb10.m3u8', category: 'Entretenimento', logo: 'assets/Imagens/imgi_19_bbb2.png' },

  // === ADULTO ===
  { id: 'playboy', name: 'Playboy TV', url: 'https://canais.fazoeli.co.za/fontes/smart/playboy.m3u8', category: 'Adulto', logo: 'assets/Imagens/adulto.png' },
  { id: 'sexy-hot', name: 'Sexy Hot', url: 'https://canais.fazoeli.co.za/fontes/smart/sexyhot.m3u8', category: 'Adulto', logo: 'assets/Imagens/adulto.png' },
  { id: 'sextreme', name: 'Sextreme', url: 'https://www1.embedtv.best/sextreme', category: 'Adulto', logo: 'assets/Imagens/adulto.png' },
  { id: 'venus', name: 'Venus', url: 'https://www1.embedtv.best/venus', category: 'Adulto', logo: 'assets/Imagens/adulto.png' },
  { id: 'sex-privé', name: 'Sex Privé', url: 'https://www1.embedtv.best/sexprive', category: 'Adulto', logo: 'assets/Imagens/adulto.png' },
  { id: 'playboy', name: 'Playboy TV', url: 'https://canais.fazoeli.co.za/fontes/smart/playboy.m3u8', category: 'Adulto', logo: 'assets/Imagens/adulto.png' },
    { id: 'sexy-hot', name: 'Sexy Hot', url: 'https://canais.fazoeli.co.za/fontes/smart/sexyhot.m3u8', category: 'Adulto', logo: 'assets/Imagens/adulto.png' },
    { id: 'adult-anal-cdn', name: 'Anal', url: 'https://cdn.adultiptv.net/anal.m3u8', category: 'Adulto', logo: 'assets/Imagens/adulto.png' },
    { id: 'adult-asian-cdn', name: 'Asian', url: 'https://cdn.adultiptv.net/asian.m3u8', category: 'Adulto', logo: 'assets/Imagens/adulto.png' },
    { id: 'adult-bigass', name: 'Big Ass', url: 'https://cdn.adultiptv.net/bigass.m3u8', category: 'Adulto', logo: 'assets/Imagens/adulto.png' },
    { id: 'adult-bigdick', name: 'Big Dick', url: 'https://cdn.adultiptv.net/bigdick.m3u8', category: 'Adulto', logo: 'assets/Imagens/adulto.png' },
    { id: 'adult-bigtits', name: 'Big Tits', url: 'https://cdn.adultiptv.net/bigtits.m3u8', category: 'Adulto',logo: 'assets/Imagens/adulto.png' },
    { id: 'adult-blowjob', name: 'Blowjob', url: 'https://cdn.adultiptv.net/blowjob.m3u8', category: 'Adulto', logo: 'assets/Imagens/adulto.png' },
    { id: 'adult-compilation', name: 'Compilation', url: 'https://cdn.adultiptv.net/compilation.m3u8', category: 'Adulto', logo: 'assets/Imagens/adulto.png' },
    { id: 'adult-cuckold', name: 'Cuckold', url: 'https://cdn.adultiptv.net/cuckold.m3u8', category: 'Adulto', logo: 'assets/Imagens/adulto.png' },
    { id: 'adult-fetish', name: 'Fetish', url: 'https://cdn.adultiptv.net/fetish.m3u8', category: 'Adulto',logo: 'assets/Imagens/adulto.png' },
    { id: 'adult-gangbang', name: 'Gangbang', url: 'https://cdn.adultiptv.net/gangbang.m3u8', category: 'Adulto', logo: 'assets/Imagens/adulto.png' },
    { id: 'adult-gay-cdn', name: 'Gay', url: 'https://cdn.adultiptv.net/gay.m3u8', category: 'Adulto', logo: 'assets/Imagens/adulto.png' },
    { id: 'adult-hardcore', name: 'Hardcore', url: 'https://cdn.adultiptv.net/hardcore.m3u8', category: 'Adulto', logo: 'assets/Imagens/adulto.png' },
    { id: 'adult-interracial', name: 'Interracial', url: 'https://cdn.adultiptv.net/interracial.m3u8', category: 'Adulto', logo: 'assets/Imagens/adulto.png' },
    { id: 'adult-livecams', name: 'Live Cams', url: 'https://cdn.adultiptv.net/livecams.m3u8', category: 'Adulto', logo: 'assets/Imagens/adulto.png' },
    { id: 'adult-pornstar-cdn', name: 'Pornstar', url: 'https://cdn.adultiptv.net/pornstar.m3u8', category: 'Adulto', logo: 'assets/Imagens/adulto.png' },
    { id: 'adult-pov', name: 'POV', url: 'https://cdn.adultiptv.net/pov.m3u8', category: 'Adulto', logo: 'assets/Imagens/adulto.png' },
    { id: 'adult-rough', name: 'Rough', url: 'https://cdn.adultiptv.net/rough.m3u8', category: 'Adulto', logo: 'assets/Imagens/adulto.png' },
    { id: 'adult-russian', name: 'Russian', url: 'https://cdn.adultiptv.net/russian.m3u8', category: 'Adulto', logo: 'assets/Imagens/adulto.png' },
    { id: 'adult-threesome', name: 'Threesome', url: 'https://cdn.adultiptv.net/threesome.m3u8', category: 'Adulto', logo: 'assets/Imagens/adulto.png' },
    { id: 'adult-woman', name: 'Woman', url: 'https://live.redtraffic.net/woman.m3u8', category: 'Adulto', logo: 'assets/Imagens/adulto.png' },
    { id: 'mycam-anal', name: 'MyCam Anal', url: 'https://live.mycamtv.com/anal.m3u8', category: 'Adulto', logo: 'assets/Imagens/adulto.png' },
    { id: 'mycam-asian', name: 'MyCam Asian', url: 'https://live.mycamtv.com/asian.m3u8', category: 'Adulto', logo: 'assets/Imagens/adulto.png' },
    { id: 'mycam-bigass', name: 'MyCam Big Ass', url: 'https://live.mycamtv.com/defstream.m3u8', category: 'Adulto', logo: 'assets/Imagens/adulto.png' },
    { id: 'mycam-bigtits', name: 'MyCam Big Tits', url: 'https://live.mycamtv.com/bigtits.m3u8', category: 'Adulto', logo: 'assets/Imagens/adulto.png' },
    { id: 'mycam-blonde', name: 'MyCam Blonde', url: 'https://live.mycamtv.com/blonde.m3u8', category: 'Adulto', logo: 'assets/Imagens/adulto.png' },
    { id: 'mycam-brunette', name: 'MyCam Brunette', url: 'https://live.mycamtv.com/brunette.m3u8', category: 'Adulto', logo: 'assets/Imagens/adulto.png' },
    { id: 'mycam-latina', name: 'MyCam Latina', url: 'https://live.mycamtv.com/latina.m3u8', category: 'Adulto', logo: 'assets/Imagens/adulto.png' },
    { id: 'mycam-squirt', name: 'MyCam Squirt', url: 'https://live.mycamtv.com/squirt.m3u8', category: 'Adulto', logo: 'assets/Imagens/adulto.png' },
    { id: 'mycam-white', name: 'MyCam White', url: 'https://live.mycamtv.com/white.m3u8', category: 'Adulto', logo: 'assets/Imagens/adulto.png' },
    { id: 'jenny-live', name: 'Jenny Live', url: 'https://59ec5453559f0.streamlock.net/JennyLive/JennyLive/playlist.m3u8', category: 'Adulto', logo: 'assets/Imagens/adulto.png' },
    { id: 'miami-tv-mexico', name: 'Miami TV Mexico', url: 'https://59ec5453559f0.streamlock.net/mexicotv/smil:miamitvmexico/playlist.m3u8', category: 'Adulto', logo: 'assets/Imagens/adulto.png' },
    { id: 'olala', name: 'O-la-la!', url: 'http://31.148.48.15/O-la-la/index.m3u8', category: 'Adulto', logo: 'assets/Imagens/adulto.png' },
    { id: 'playboy-latam', name: 'Playboy TV Latin America', url: 'http://190.11.225.124:5000/live/playboy_hd/playlist.m3u8', category: 'Adulto', logo: 'assets/Imagens/adulto.png' },
];

// Lógica de exportação igual ao original para manter compatibilidade
export const categoryOrder = [
  'TV Aberta',
  'Filmes',
  'Series',
  'Esportes',
  'Noticias',
  'Infantil',
  'Documentarios',
  'Entretenimento',
  '24h',
  'Reality',
  'Streaming',
  'Internacionais',
  'Adulto',
  ...restrictedCategories,
];

// Ordenação
const sortedByCategory = [...rawChannels].sort((a, b) => {
  const catIndexA = categoryOrder.indexOf(a.category);
  const catIndexB = categoryOrder.indexOf(b.category);
  if (catIndexA !== catIndexB) return catIndexA - catIndexB;
  return a.name.localeCompare(b.name, 'pt-BR');
});

// Adiciona numeração
const allChannels: Channel[] = sortedByCategory.map((channel, index) => ({
  ...channel,
  channelNumber: index + 1,
}));

// Exportações filtradas
export const channels: Channel[] = allChannels.filter(ch => ch.category !== 'Adulto');
export const adultChannels: Channel[] = allChannels.filter(ch => ch.category === 'Adulto');

// Função principal de acesso
export const getAllChannels = (includeAdult: boolean): Channel[] => {
  if (includeAdult) {
    // Retorna a lista unificada e reordenada incluindo os adultos
    return [...allChannels]; 
  }
  return channels;
};
