<div class="custom-slider">
            <span class="btn-prev">
                <svg class="arrow-down" viewBox="0 0 14 8">
                       <path d="M1.1.7C1.6.2 2.2.2 2.8.7l4.2 4 4.2-4c.6-.5 1.2-.5 1.7 0s.4 1.3 0 1.7c-.4.5-5.1 4.9-5.1 4.9-.2.3-.5.4-.8.4-.3 0-.6-.1-.9-.4 0 0-4.6-4.4-5.1-4.9C.6 2 .6 1.2 1.1.7z"/>
                </svg>
            </span>
            <div class="single-item">
                <?php
                if(have_rows('slider_background')):
                    $i = 0;
                    while(have_rows('slider_background')):
                        the_row();
                        $video = get_sub_field('video');
                        $img = get_sub_field('image');
                        if(!is_mobile()):
                            ?>
                            <div class="embed-video" data-slide="<?php echo $i++ ?>">
                                <?php if($video): ?>
                                <div class="embed-responsive home-video block-bg-cover">
                                    
                                        <video class="element-cover" loop id="video1" autoplay>
                                            <source src="<?php echo $video['url']; ?>" type="video/mp4">
                                        </video>
                                    
                                </div>
                                <?php endif; ?>
                                <div class="text-middle">
                                    <?php the_sub_field('text') ?>
                                </div>
                            </div>

                        <?php else: ?>
                            <div class="embed-video" data-slide="<?php echo $i++ ?>">
                                <?php if($img): ?>
                                    <div class="embed-responsive home-video block-bg-cover">
                                    
                                        <img src="<?php echo $img['url'] ?>" />
                                    </div>
                                    <?php endif; ?>
                                    <div class="text-middle">
                                        <?php the_sub_field('text') ?>
                                    </div>
                                
                            </div>
                        <?php endif; ?>
                    <?php endwhile; ?>
                <?php endif; ?>
            </div>
            <span class="btn-next">
                <svg class="arrow-down" viewBox="0 0 14 8">
                       <path d="M1.1.7C1.6.2 2.2.2 2.8.7l4.2 4 4.2-4c.6-.5 1.2-.5 1.7 0s.4 1.3 0 1.7c-.4.5-5.1 4.9-5.1 4.9-.2.3-.5.4-.8.4-.3 0-.6-.1-.9-.4 0 0-4.6-4.4-5.1-4.9C.6 2 .6 1.2 1.1.7z"/>
                </svg>
            </span>
        </div>
