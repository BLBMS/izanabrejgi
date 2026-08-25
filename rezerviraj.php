<?php
// 046
// rezerviraj.php
// Stran za rezervacije - preusmeritev na index.php z rezervacijskim overlayjem

// Preusmerimo na index.php z parametrom, da se odpre rezervacijski overlay
header('Location: index.php?action=rezerviraj');
exit;
?>