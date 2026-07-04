/** レンタル済み素材の動画をダウンロード */
export function downloadMaterial(videoUrl: string, filename: string) {
  const a = document.createElement("a");
  a.href = videoUrl;
  a.download = `${filename}.mp4`;
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
