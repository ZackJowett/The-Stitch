$(document).ready(() => {
	// Reset scroll
	window.scrollTo(0, 0);

	// Constants
	const $sideScroll = $(".side-scroll"); // scroll to left side
	const $vertScroll = $(".vert-scroll"); // scroll to top
	const $moveLeft = $(".move-left"); // align to left in container
	const $container = $(".heading-container");
	const $up = $(".span-move-up");
	const $down = $(".span-move-down");
	const $fadeOut = $(".fade-out");

	// Update heading on scroll
	$(window).scroll((e) => {
		handleHeadingMovement();
	});

	// Update heading on window resize
	$(window).resize(() => {
		handleHeadingMovement();
	});

	// Handles all movement to do with the main heading
	function handleHeadingMovement() {
		let windowScrollPos = $(window).scrollTop();

		let viewportHeight = $(".splash").height();
		let viewportHeightRatio = windowScrollPos / viewportHeight;

		if (viewportHeightRatio < 1) {
			scrollMovement(viewportHeightRatio);
			characterWeave(viewportHeightRatio);

			// fade "on SYN" link
			fadeSubheading(viewportHeightRatio);
		} else {
			// Reset
			$sideScroll.css("left", $container.outerWidth() / 2);
			$vertScroll.css("top", $container.outerHeight() / 2);
			$moveLeft.css("left", $moveLeft.width() / 2);
			$up.css("bottom", 0);
			$down.css("top", 0);

			// $fadeOut.css("opacity", 0).addClass("disable");
		}
	}

	// Adjusts position of the brand title container and text when scrolling
	function scrollMovement(ratio) {
		let windowWidth = $(window).width();
		let windowHeight = $(window).height();

		// Calculates the ratio of 1 full page scroll translated to left
		// distance from edge (including length of text)
		let halfWidthScrollPercent =
			ratio * (windowWidth / 2 - $container.outerWidth() / 2);

		let halfHeightScrollPercent =
			ratio * (windowHeight / 2 - $container.outerHeight() / 2);

		let moveLeftScrollPercent =
			ratio * ($container.width() / 2 - $moveLeft.outerWidth() / 2);

		$container.css("left", windowWidth / 2 - halfWidthScrollPercent);
		$container.css("top", windowHeight / 2 - halfHeightScrollPercent);
		$moveLeft.css("left", $container.width() / 2 - moveLeftScrollPercent);
	}

	// Makes individual characters "stitch" up and down with scroll
	function characterWeave(ratio) {
		const multiplier = 2;

		// set css classes
		$up.css("bottom", Math.sin(ratio * Math.PI) * multiplier + "rem");
		$down.css("top", Math.sin(ratio * Math.PI) * multiplier + "rem");
	}

	// Fades in/out and disables the brand title subheading with scroll
	function fadeSubheading(ratio) {
		$fadeOut.css("opacity", 1 - ratio * 2);

		// When not visible, disabled click events on the link
		if ($fadeOut.css("opacity") <= 0.01) {
			if (!$fadeOut.hasClass("disabled-anchor")) {
				$fadeOut.addClass("disabled-anchor");
			}
		} else {
			if ($fadeOut.hasClass("disabled-anchor")) {
				$fadeOut.removeClass("disabled-anchor");
			}
		}
	}

	// Zoom scroll
});
