/**
 * script.js — Garis Hidup Tanggal Lahir
 * Sistem Informasi | ITENAS 2024
 * Uses jQuery for DOM manipulation & events
 */

$(document).ready(function () {

  /* ============================================
     1. BUILD BACKGROUND LOGO PATTERN
  ============================================ */
  function buildBgPattern() {
    var $bg = $("#bg-pattern");
    $bg.empty();
    var cols = Math.ceil($(window).width() / 58) + 2;
    var rows = Math.ceil($(window).height() / 58) + 2;
    var total = cols * rows;
    for (var i = 0; i < total; i++) {
      var $img = $("<img>").attr("src", LOGO_SRC).attr("alt", "");
      $bg.append($img);
    }
  }

  /* ============================================
     2. BUILD HEADER 6-GRID (2 rows × 3 cols)
  ============================================ */
  function buildHeaderGrid() {
    var $grid = $("#header-grid");
    $grid.empty();
    for (var i = 0; i < 6; i++) {
      var $img = $("<img>").attr("src", IDENAS_SRC).attr("alt", "ITENAS");
      $grid.append($img);
    }
  }

  /* ============================================
     3. BUILD DROPDOWN OPTIONS
  ============================================ */
  function buildDropdowns() {
    // Tanggal 1–31
    var $tgl = $("#sel-tanggal");
    for (var d = 1; d <= 31; d++) {
      $tgl.append($("<option>").val(d).text(d));
    }

    // Bulan
    var bulanNames = [
      "Januari", "Februari", "Maret", "April",
      "Mei", "Juni", "Juli", "Agustus",
      "September", "Oktober", "November", "Desember"
    ];
    var $bln = $("#sel-bulan");
    $.each(bulanNames, function (i, name) {
      $bln.append($("<option>").val(i + 1).text(name));
    });

    // Tahun 1950–2010
    var $thn = $("#sel-tahun");
    for (var y = 1950; y <= 2026; y++) {
      $thn.append($("<option>").val(y).text(y));
    }
  }

  /* ============================================
     4. NAVIGATION
  ============================================ */
  function showPage(name) {
    $(".page").removeClass("active").hide();
    $("#page-" + name).addClass("active").show();

    $("nav#main-nav a").removeClass("active-nav");
    $("nav#main-nav a[data-page='" + name + "']").addClass("active-nav");

    // Hide result when switching away from home
    if (name !== "home") {
      $("#result-section").hide();
    }
  }

  $("nav#main-nav a").on("click", function () {
    var page = $(this).data("page");
    showPage(page);
  });

  $(".nav-link").on("click", function () {
    var page = $(this).data("page");
    showPage(page);
  });

  /* ============================================
     5. DIGIT SUM HELPERS
  ============================================ */
  function digitSum(n) {
    var s = 0;
    String(n).split("").forEach(function (ch) {
      s += parseInt(ch, 10);
    });
    return s;
  }

  function reduceToSingle(n) {
    while (n > 9) {
      n = digitSum(n);
    }
    return n;
  }

  /* ============================================
     6. KIRIM — Calculate & Display
  ============================================ */
  $("#btn-kirim").on("click", function () {
    var t = parseInt($("#sel-tanggal").val(), 10);
    var b = parseInt($("#sel-bulan").val(), 10);
    var y = parseInt($("#sel-tahun").val(), 10);

    // Gabung semua digit tanggal + bulan + tahun
    var allDigits = String(t) + String(b) + String(y);
    var hasil1 = 0;
    allDigits.split("").forEach(function (ch) {
      hasil1 += parseInt(ch, 10);
    });

    // Hasil 2: jumlahkan digit hasil1 jika masih > 9
    var hasil2 = hasil1 > 9 ? digitSum(hasil1) : hasil1;

    // Hasil Akhir: terus kurangi hingga 1–9
    var hasilAkhir = reduceToSingle(hasil2);

    // Update output fields
    $("#out-tanggal").text(t);
    $("#out-bulan").text(b);
    $("#out-tahun").text(y);
    $("#out-hasil1").text(hasil1);
    $("#out-hasil2").text(hasil2);
    $("#out-hasilakhir").text(hasilAkhir);

    // Show result description
    var desc = garisHidupData[hasilAkhir];
    $("#result-title").text(desc.title);
    $("#result-text").html(desc.full);
    $("#result-section").fadeIn(300);

    // Scroll to result
    $("html, body").animate(
      { scrollTop: $("#result-section").offset().top - 20 },
      400
    );
  });

  /* ============================================
     7. RESET
  ============================================ */
  $("#btn-reset").on("click", function () {
    $("#sel-tanggal").val("1");
    $("#sel-bulan").val("1");
    $("#sel-tahun").val("1950");

    var fields = ["#out-tanggal", "#out-bulan", "#out-tahun",
                  "#out-hasil1", "#out-hasil2", "#out-hasilakhir"];
    $.each(fields, function (i, id) {
      $(id).text("");
    });

    $("#result-section").fadeOut(200);
  });

  /* ============================================
     8. BUILD GARIS HIDUP LIST PAGE
  ============================================ */
  function buildGarisHidupList() {
    var $list = $("#gh-list");
    $list.empty();
    $.each(garisHidupData, function (num, data) {
      var $item = $("<div>").addClass("gh-item");
      $item.append($("<strong>").text("Garis Hidup " + num));
      $item.append($("<span>").text(data.short));
      $list.append($item);
    });
  }

  /* ============================================
     9. INIT
  ============================================ */
  buildBgPattern();
  buildHeaderGrid();
  buildDropdowns();
  buildGarisHidupList();
  showPage("home");

  // Rebuild bg on resize
  $(window).on("resize", function () {
    buildBgPattern();
  });

});